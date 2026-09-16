import { motion } from 'framer-motion';
import { X, Send, Mic, Loader2, Volume2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { AIState } from './AbhiAIRobot';
import { Message } from '../../hooks/useAbhiAI';
import { ProjectsResponse } from './responses/ProjectsResponse';
import { SkillsResponse } from './responses/SkillsResponse';
import { ExperienceResponse } from './responses/ExperienceResponse';
import { AboutResponse } from './responses/AboutResponse';

interface AbhiAIPanelProps {
  isDark: boolean;
  onClose: () => void;
  aiState: AIState;
  setAiState: (state: AIState) => void;
  messages: Message[];
  sendMessage: (text: string) => void;
  toggleRecording: () => void;
  isRecording: boolean;
}

const quickActions = [
  "Projects",
  "Skills",
  "Experience",
  "About"
];

const AbhiAIPanel = ({ isDark, onClose, aiState, setAiState, messages, sendMessage, toggleRecording, isRecording }: AbhiAIPanelProps) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, aiState]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setInput("");
    sendMessage(text);
  };

  const handleMicClick = () => {
    toggleRecording();
  };

  const bgPanel = isDark ? "bg-[#0a1220] border-amber-500/20" : "bg-white border-amber-900/15";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-600";
  const msgUserBg = isDark ? "bg-amber-500/20 text-amber-50" : "bg-amber-100 text-amber-900";
  const msgAiBg = isDark ? "bg-white/5 text-gray-200" : "bg-gray-50 text-gray-800 border";
  const inputBg = isDark ? "bg-[#050d1a] border-white/10" : "bg-gray-50 border-gray-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`
        fixed inset-x-4 top-24 bottom-4 z-[100] flex flex-col rounded-2xl border shadow-2xl overflow-hidden
        md:absolute md:inset-auto md:top-12 md:-right-[80px] md:w-[380px] md:h-[500px]
        ${bgPanel}
      `}
      style={{ transformOrigin: 'top right' }}
    >
      {/* Header */}
      <div className={`p-4 border-b flex justify-between items-center ${isDark ? "border-white/10" : "border-gray-200"}`}>
        <div className="flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full ${isDark ? "bg-amber-400" : "bg-amber-600"} animate-pulse`} />
           <div className="flex flex-col">
             <span className={`text-xs font-bold font-mono tracking-widest uppercase leading-none ${textPrimary}`}>Abhi AI</span>
             <span className={`text-[9px] font-mono tracking-wider uppercase mt-1 ${textSecondary}`}>Portfolio Assistant</span>
           </div>
        </div>
        <button onClick={onClose} className={`${textSecondary} hover:text-amber-500 transition-colors`}>
          <X size={16} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line shadow-sm ${m.role === 'user' ? msgUserBg + ' rounded-tr-sm' : msgAiBg + ' rounded-tl-sm'}`}>
              {m.content}
              {m.type === 'projects' && <ProjectsResponse isDark={isDark} />}
              {m.type === 'skills' && <SkillsResponse isDark={isDark} />}
              {m.type === 'experience' && <ExperienceResponse isDark={isDark} />}
              {m.type === 'about' && <AboutResponse isDark={isDark} />}
            </div>
          </div>
        ))}
        
        {aiState === 'THINKING' && (
           <div className="flex justify-start">
             <div className={`max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 ${msgAiBg}`}>
               <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0ms' }} />
               <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }} />
               <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
           </div>
        )}

        {aiState === 'SPEAKING' && (
           <div className="flex justify-start">
             <div className={`max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm flex items-center gap-2 ${msgAiBg}`}>
               <Volume2 size={14} className="text-amber-500 animate-pulse" />
               <span className="text-xs text-gray-500">Speaking...</span>
             </div>
           </div>
        )}

        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mt-4 pb-2">
            {quickActions.map((action, i) => (
              <button 
                key={i}
                onClick={() => handleSend(action)}
                className={`text-[11px] font-medium px-4 py-2 rounded-full border transition-all hover:scale-105 active:scale-95 shadow-sm
                  ${isDark ? "border-amber-500/30 text-amber-400 bg-amber-500/5 hover:bg-amber-500/20" : "border-amber-600/30 text-amber-700 bg-amber-50 hover:bg-amber-100"}
                `}
              >
                {action}
              </button>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`p-3 border-t ${isDark ? "border-white/10" : "border-gray-200"}`}>
        <div className={`relative flex items-center rounded-full border px-2 py-1 ${inputBg}`}>
          <button 
            onClick={handleMicClick}
            className={`p-2 rounded-full transition-colors ${
              aiState === 'LISTENING' 
                ? "bg-amber-500 text-white animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]" 
                : `${textSecondary} hover:text-amber-500`
            }`}
          >
            <Mic size={16} />
          </button>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder={aiState === 'LISTENING' ? "Listening..." : "Ask Abhi AI anything..."}
            className={`flex-1 bg-transparent border-none outline-none px-2 text-sm ${textPrimary} placeholder:text-gray-500`}
            disabled={aiState === 'LISTENING' || aiState === 'THINKING' || aiState === 'SPEAKING'}
          />
          <button 
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className={`p-2 rounded-full transition-colors ${input.trim() ? "text-amber-500 hover:bg-amber-500/10" : "text-gray-500 opacity-50"}`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AbhiAIPanel;
