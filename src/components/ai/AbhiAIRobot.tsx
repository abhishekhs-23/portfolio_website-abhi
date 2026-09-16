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

// The actual 3D AI Robot
const AICore3D = ({ state, isDark }: { state: AIState; isDark: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const visorRef = useRef<THREE.MeshStandardMaterial>(null);

  const mainColor = isDark ? "#ffffff" : "#0f172a";
  const visorColor = state === 'LISTENING' ? "#10b981" : state === 'THINKING' ? "#3b82f6" : state === 'SPEAKING' ? "#f59e0b" : "#0ea5e9";

  useFrame(({ clock }) => {
    if (!group.current || !headRef.current || !leftArmRef.current || !rightArmRef.current) return;
    const t = clock.getElapsedTime();
    
    // Smooth hover effect
    group.current.position.y = Math.sin(t * 2) * 0.15 - 0.3;

    switch (state) {
      case 'IDLE':
        headRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
        headRef.current.rotation.x = Math.sin(t * 1) * 0.1;
        leftArmRef.current.position.y = Math.sin(t * 2) * 0.05;
        rightArmRef.current.position.y = Math.cos(t * 2) * 0.05;
        break;
      case 'LISTENING':
        headRef.current.rotation.y = 0;
        headRef.current.rotation.z = 0.2; // Tilt head
        headRef.current.rotation.x = 0.1;
        leftArmRef.current.position.y = 0.1;
        rightArmRef.current.position.y = 0.1;
        break;
      case 'THINKING':
        headRef.current.rotation.y = t * 2; // Spin head around
        headRef.current.rotation.z = 0;
        headRef.current.rotation.x = 0;
        leftArmRef.current.position.y = Math.sin(t * 4) * 0.1;
        rightArmRef.current.position.y = Math.cos(t * 4) * 0.1;
        break;
      case 'SPEAKING':
        headRef.current.rotation.x = Math.sin(t * 15) * 0.15; // Nodding
        headRef.current.rotation.y = Math.sin(t * 2) * 0.2;
        leftArmRef.current.position.y = Math.sin(t * 10) * 0.1;
        rightArmRef.current.position.y = Math.sin(t * 10 + Math.PI) * 0.1;
        break;
    }
  });

  return (
    <group ref={group} scale={0.5}>
      {/* Floating Head */}
      <group ref={headRef} position={[0, 1.3, 0]}>
        {/* Head Sphere */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshPhysicalMaterial 
            color={mainColor} 
            metalness={0.3} 
            roughness={0.1} 
            clearcoat={1} 
            clearcoatRoughness={0.1}
          />
        </mesh>
        
        {/* Glowing Visor (Eyes) */}
        <mesh position={[0, 0.1, 0.61]} scale={[1, 0.3, 0.4]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.3, 0.5, 16, 16]} />
          <meshStandardMaterial 
            ref={visorRef} 
            color={visorColor} 
            emissive={visorColor} 
            emissiveIntensity={2} 
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Floating Body */}
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.6, 1.2, 32, 32]} />
        <meshPhysicalMaterial 
          color={mainColor} 
          metalness={0.3} 
          roughness={0.1} 
          clearcoat={1} 
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Floating Left Arm */}
      <group ref={leftArmRef} position={[-0.9, -0.2, 0]}>
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[0.2, 0.7, 16, 16]} />
          <meshPhysicalMaterial color={mainColor} metalness={0.3} roughness={0.1} clearcoat={1} />
        </mesh>
      </group>

      {/* Floating Right Arm */}
      <group ref={rightArmRef} position={[0.9, -0.2, 0]}>
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[0.2, 0.7, 16, 16]} />
          <meshPhysicalMaterial color={mainColor} metalness={0.3} roughness={0.1} clearcoat={1} />
        </mesh>
      </group>
    </group>
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
      <div className="group relative flex flex-col items-center justify-center gap-1.5">
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
            </motion.button>
          )}
        </AnimatePresence>
        
        {isVisible && (
          <motion.span 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-[9px] font-mono font-bold tracking-[0.2em] uppercase ${isDark ? 'text-white/40' : 'text-black/40'}`}
          >
            Abhi AI
          </motion.span>
        )}

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
