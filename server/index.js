import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Groq from 'groq-sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from the root directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors());
app.use(express.json());

// Load Knowledge Base
const knowledgeBase = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'knowledgeBase.json'), 'utf-8')
);

const SYSTEM_PROMPT = `You are "Abhi AI", the interactive digital representation of Abhi (Abhishek), an AI-powered portfolio assistant.
Your goal is to answer questions about Abhi professionally, naturally, and concisely based ONLY on the provided context.
Do NOT invent information. If the answer is not in the context, politely say you don't have that information.
Keep answers brief, conversational, and suitable for text-to-speech.

You can also control the portfolio website. If the user asks to see something, navigate them by ending your response with an exact action tag.
Available tags:
[ACTION: NAVIGATE_PROJECTS]
[ACTION: NAVIGATE_EXPERIENCE]
[ACTION: NAVIGATE_SKILLS]
[ACTION: NAVIGATE_CONTACT]
[ACTION: OPEN_GITHUB]
[ACTION: OPEN_LINKEDIN]
[ACTION: DOWNLOAD_RESUME]

Example:
User: "Show me your projects."
AI: "I'd be happy to show you my projects. Let's take a look. [ACTION: NAVIGATE_PROJECTS]"
`;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages array' });
    }

    const contextStr = JSON.stringify(knowledgeBase, null, 2);
    const systemMessage = {
      role: 'system',
      content: `${SYSTEM_PROMPT}\n\nHere is Abhi's professional information (Context):\n${contextStr}`
    };

    const completion = await groq.chat.completions.create({
      messages: [systemMessage, ...messages],
      model: process.env.GROQ_LLM_MODEL || 'llama3-8b-8192',
      temperature: 0.5,
      max_tokens: 512,
    });

    const aiResponse = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Groq LLM error:', error);
    res.status(500).json({ error: 'Failed to process chat' });
  }
});

app.post('/api/ai/transcribe', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const newPath = req.file.path + '.webm';
    fs.renameSync(req.file.path, newPath);

    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(newPath),
      model: process.env.GROQ_STT_MODEL || 'whisper-large-v3-turbo',
      response_format: 'json',
    });

    // Cleanup uploaded file
    fs.unlinkSync(newPath);

    res.json({ text: transcription.text });
  } catch (error) {
    console.error('Groq STT error:', error);
    if (req.file) {
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      if (fs.existsSync(req.file.path + '.webm')) fs.unlinkSync(req.file.path + '.webm');
    }
    res.status(500).json({ error: 'Failed to transcribe audio' });
  }
});

// Since groq-sdk might not natively have audio.speech yet depending on version, 
// we will use fetch for the OpenAI-compatible speech endpoint.
app.post('/api/ai/tts', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }

    // Clean text by removing ACTION tags before speaking
    const cleanText = text.replace(/\[ACTION:.*?\]/g, '').trim();

    const response = await fetch('https://api.groq.com/openai/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.GROQ_TTS_MODEL || 'canopylabs/orpheus-v1-english',
        input: cleanText,
        voice: 'troy', // Groq supported voice
        response_format: 'wav',
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Groq TTS error response:', errText);
      throw new Error(`TTS API error: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    res.set({
      'Content-Type': 'audio/wav',
      'Content-Length': audioBuffer.byteLength,
    });
    res.send(Buffer.from(audioBuffer));
  } catch (error) {
    console.error('Groq TTS error:', error);
    res.status(500).json({ error: 'Failed to generate speech' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AI Backend Server running on http://localhost:${PORT}`);
});
