import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import AbhiAIPanel from './AbhiAIPanel';
import * as THREE from 'three';
import { useAbhiAI } from '../../hooks/useAbhiAI';

export type AIState = 'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING';

interface AbhiAIRobotProps {
  isDark: boolean;
}

// The actual 3D AI Core
const AICore3D = ({ state, isDark }: { state: AIState; isDark: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current || !materialRef.current) return;
    const t = clock.getElapsedTime();
    
    // Base rotation
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;

    // State-based dynamic changes
    let targetDistort = 0.2;
    let targetSpeed = 1;
    let targetScale = 1;

    switch (state) {
      case 'LISTENING':
        targetDistort = 0.4 + Math.sin(t * 3) * 0.2; // Wavy
        targetSpeed = 3;
        targetScale = 1.2;
        break;
      case 'THINKING':
        targetDistort = 0.1;
        targetSpeed = 0.5; // Slow down
        targetScale = 0.9 + Math.sin(t * 2) * 0.1; // Pulsing
        break;
      case 'SPEAKING':
        targetDistort = 0.5 + Math.sin(t * 15) * 0.3; // Rapid reacting
        targetSpeed = 4;
        targetScale = 1.1 + Math.sin(t * 8) * 0.1;
        break;
      default: // IDLE
        targetDistort = 0.2;
        targetSpeed = 1;
        targetScale = 1;
    }

    // Smoothly interpolate towards targets
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
    );
    materialRef.current.distort = THREE.MathUtils.lerp(
      materialRef.current.distort, targetDistort, 0.1
    );
    materialRef.current.speed = THREE.MathUtils.lerp(
      materialRef.current.speed, targetSpeed, 0.1
    );
  });

  const coreColor = isDark ? "#f59e0b" : "#d97706"; // Amber colors

  return (
    <Icosahedron ref={meshRef} args={[1, 4]}>
      <MeshDistortMaterial
        ref={materialRef}
        color={coreColor}
        emissive={coreColor}
        emissiveIntensity={0.5}
        wireframe={true}
        transparent
        opacity={0.8}
        distort={0.2}
        speed={1}
      />
    </Icosahedron>
  );
};

const AbhiAIRobot = ({ isDark }: AbhiAIRobotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [aiState, setAiState] = useState<AIState>('IDLE');
  const [isVisible, setIsVisible] = useState(false);
  const { messages, sendMessage, toggleRecording, isRecording, playTTS } = useAbhiAI(setAiState);

  const hasGreetedRef = useRef(false);

  // Welcome interaction logic
  useEffect(() => {
    const handleFirstInteraction = async () => {
      if (hasGreetedRef.current) return;
      hasGreetedRef.current = true;
      
      // Remove listeners
      window.removeEventListener('mousemove', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      
      setIsVisible(true);
      await playTTS("Hi, welcome. I am Abhi's AI. I am here.");
    };

    window.addEventListener('mousemove', handleFirstInteraction, { passive: true });
    window.addEventListener('scroll', handleFirstInteraction, { passive: true });
    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [playTTS]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex flex-col items-center z-50">
      <div className="group relative flex items-center justify-center">
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={handleToggle}
              className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isDark 
                  ? "bg-[#050d1a] shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]" 
                  : "bg-white shadow-md hover:shadow-xl"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Ask Abhi AI"
            >
              {/* Outer glow rings */}
              <motion.div
                className={`absolute inset-0 rounded-full border border-amber-500/30`}
                animate={{
                  scale: aiState === 'LISTENING' ? [1, 1.3, 1] : aiState === 'SPEAKING' ? [1, 1.4, 1, 1.2, 1] : 1,
                  opacity: aiState === 'IDLE' ? 0.3 : 0.8
                }}
                transition={{
                  duration: aiState === 'LISTENING' ? 1.5 : aiState === 'SPEAKING' ? 0.3 : 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* 3D Canvas container */}
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center pointer-events-none">
                <Canvas camera={{ position: [0, 0, 2.5] }}>
                  <ambientLight intensity={1} />
                  <pointLight position={[10, 10, 10]} intensity={2} />
                  <AICore3D state={aiState} isDark={isDark} />
                </Canvas>
              </div>

              {/* Tooltip */}
              <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-black/90 text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 shadow-xl z-50">
                ASK ABHI AI
              </div>
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Placeholder to prevent layout shift before interaction */}
        {!isVisible && <div className="w-12 h-12" />}
      </div>

      <AnimatePresence>
        {isOpen && (
          <AbhiAIPanel 
            isDark={isDark} 
            aiState={aiState} 
            setAiState={setAiState} 
            onClose={() => setIsOpen(false)} 
            messages={messages}
            sendMessage={sendMessage}
            toggleRecording={toggleRecording}
            isRecording={isRecording}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AbhiAIRobot;
