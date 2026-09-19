import { useState, useRef, useCallback } from 'react';
import { AIState } from '../components/ai/AbhiAIRobot';

export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  type?: 'text' | 'projects' | 'skills' | 'experience' | 'about';
}

export const useAbhiAI = (setAiState: (state: AIState) => void) => {
  const getApiBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
    if (import.meta.env.PROD) return '';
    return 'http://localhost:3001';
  };

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: "Hey, I’m Abhi AI.\nExplore Abhishek’s projects, skills, experience, and background.", type: 'text' }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const processActionTags = (text: string) => {
    let cleanText = text;
    const actions = text.match(/\[ACTION:\s*([A-Z_]+)\]/g);
    
    if (actions) {
      actions.forEach(actionTag => {
        cleanText = cleanText.replace(actionTag, '');
        const action = actionTag.replace('[ACTION: ', '').replace(']', '').trim();
        
        switch (action) {
          case 'NAVIGATE_PROJECTS':
            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case 'NAVIGATE_EXPERIENCE':
            document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case 'NAVIGATE_SKILLS':
            document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case 'NAVIGATE_CONTACT':
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case 'OPEN_GITHUB':
            window.open('https://github.com/abhishekhs-23', '_blank'); // Adjust URL as needed
            break;
          case 'OPEN_LINKEDIN':
            window.open('https://www.linkedin.com/in/abhishek-h-s-9173a541b/', '_blank'); // Adjust URL as needed
            break;
          case 'DOWNLOAD_RESUME':
            window.open('/abhishek-hs.pdf', '_blank');
            break;
        }
      });
    }
    return cleanText.trim();
  };

  const playTTS = useCallback(async (text: string) => {
    try {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
      }

      const response = await fetch(`${getApiBaseUrl()}/api/ai/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!response.ok) throw new Error('TTS failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      currentAudioRef.current = audio;
      
      setAiState('SPEAKING');
      audio.play().catch(e => {
        console.error("Audio play blocked:", e);
        setAiState('IDLE');
      });

      audio.onended = () => {
        setAiState('IDLE');
        URL.revokeObjectURL(url);
      };
    } catch (error) {
      console.error('TTS Playback error:', error);
      setAiState('IDLE');
    }
  }, [setAiState]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    // Stop any currently playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
    }

    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    const newMessages = [...messages, newUserMsg];
    setMessages(newMessages);

    // Intercept structured quick actions
    const lowerText = text.toLowerCase().trim();
    if (['projects', 'skills', 'experience', 'about'].includes(lowerText)) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now().toString(), 
          role: 'ai', 
          content: `Here is information about my ${lowerText}:`, 
          type: lowerText as 'projects' | 'skills' | 'experience' | 'about' 
        }]);
        setAiState('IDLE');
      }, 500); // Small delay for realistic feel
      return;
    }

    setAiState('THINKING');

    try {
      const response = await fetch(`${getApiBaseUrl()}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send history excluding the system prompt (which backend handles)
        body: JSON.stringify({ 
          messages: newMessages.map(m => ({ 
            role: m.role === 'ai' ? 'assistant' : m.role, 
            content: m.content === "Hey, I’m Abhi AI.\nExplore Abhishek’s projects, skills, experience, and background." ? "Hello" : m.content 
          })) 
        })
      });

      if (!response.ok) throw new Error('Chat failed');

      const data = await response.json();
      const rawAiText = data.response;
      
      // Extract actions and get clean text
      const cleanAiText = processActionTags(rawAiText);
      
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: cleanAiText }]);
      
      // Play audio response
      if (cleanAiText) {
        await playTTS(cleanAiText);
      } else {
        setAiState('IDLE');
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: "Sorry, I'm having trouble connecting to my servers right now." }]);
      setAiState('IDLE');
    }
  };

  const startRecording = async () => {
    try {
      // Stop any currently playing audio
      if (currentAudioRef.current) {
         currentAudioRef.current.pause();
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach(track => track.stop());
        
        if (audioBlob.size > 0) {
          setAiState('THINKING');
          const formData = new FormData();
          formData.append('audio', audioBlob, 'audio.webm');
          
          try {
            const response = await fetch(`${getApiBaseUrl()}/api/ai/transcribe`, {
              method: 'POST',
              body: formData,
            });
            
            if (!response.ok) throw new Error('Transcription failed');
            
            const data = await response.json();
            if (data.text) {
              await sendMessage(data.text);
            } else {
              setAiState('IDLE');
            }
          } catch (error) {
            console.error(error);
            setAiState('IDLE');
          }
        } else {
          setAiState('IDLE');
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setAiState('LISTENING');
    } catch (error) {
      console.error('Microphone error:', error);
      alert('Could not access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return {
    messages,
    sendMessage,
    toggleRecording,
    isRecording,
    playTTS
  };
};
