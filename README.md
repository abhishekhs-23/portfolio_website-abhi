# Abhishek H S - AI-Powered Developer Portfolio

Welcome to my interactive, 3D, and AI-driven developer portfolio. This project is designed not just to showcase my work, but to demonstrate my expertise in Full Stack Development, Generative AI, and Modern Web UI engineering.

## 🌟 Key Features

*   **Abhi AI (Portfolio Assistant)**: A built-in RAG-based AI assistant that knows everything about my projects, skills, and experience. 
    *   **Text & Voice**: Supports text chat and voice input (Speech-to-Text).
    *   **Voice Responses**: Responds with audio (Text-to-Speech) alongside text.
    *   **Interactive Responses**: Instead of standard text blocks, the AI renders dynamic, interactive React components (like collapsible Project Cards and structured Skill sets).
*   **3D Interactive UI**: Utilizes Three.js and React Three Fiber to render an interactive "Skills Orb" and ambient floating backgrounds.
*   **Modern Aesthetics**: Fully responsive Dark/Light modes, smooth Framer Motion animations, and a sleek glassmorphic design system.

## 🛠️ Technology Stack

### Frontend
*   **React + TypeScript**: Built with Vite for rapid development.
*   **Three.js & React Three Fiber (@react-three/drei)**: For rendering performant 3D canvases, floating nodes, and ambient particle systems.
*   **Tailwind CSS**: For utility-first, highly customizable styling.
*   **Framer Motion**: For complex, spring-based UI animations and page transitions.
*   **Lucide React**: Clean, modern iconography.

### Backend (AI Server)
*   **Node.js & Express**: Lightweight backend to handle API routing and file processing.
*   **Groq SDK**: Powers the AI features for ultra-fast inference.
    *   **LLM**: Uses Llama-3 for intelligent chat responses based on a local Knowledge Base (RAG).
    *   **STT**: Uses Whisper-v3 for transcribing user voice input.
    *   **TTS**: Integrates Text-to-Speech capabilities for an immersive assistant experience.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm or yarn
*   A Groq API Key

### 1. Installation

Clone the repository and install the dependencies for both the frontend and backend:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Environment Variables

Create a `.env` file in the root directory and add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3001
VITE_API_URL=http://localhost:3001
```

### 3. Running the Application

You need to run both the frontend Vite server and the backend Express server.

**Start the Backend Server (Terminal 1):**
```bash
cd server
npm start
```
*(The server will run on `http://localhost:3001` and load the `knowledgeBase.json` context).*

**Start the Frontend App (Terminal 2):**
```bash
npm run dev
```
*(The React app will be available on `http://localhost:8080` or the port specified by Vite).*

## 📁 Project Structure

*   `/src`: Contains the React frontend application.
    *   `/components`: UI components (Hero, About, Projects, etc.).
    *   `/components/ai`: The Abhi AI Chatbot and 3D Robot UI logic.
    *   `/components/canvas`: Three.js specific WebGL components.
    *   `/hooks`: Custom React hooks, including `useAbhiAI.ts` for managing AI state and API communication.
*   `/server`: Contains the Express backend.
    *   `index.js`: API routes and Groq integrations.
    *   `knowledgeBase.json`: The central RAG data source containing all portfolio details.

## 🤝 Contact

Feel free to reach out to me via LinkedIn or GitHub!
*   **GitHub**: [abhishekhs-23](https://github.com/abhishekhs-23)
