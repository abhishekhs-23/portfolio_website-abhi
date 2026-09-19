import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import AbhiAIPanel from './AbhiAIPanel';
import * as THREE from 'three';
import { useAbhiAI } from '../../hooks/useAbhiAI';

export type AIState = 'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING';

interface AbhiAIRobotProps {
  isDark: boolean;
}

// State → color mapping
const stateColor = {
  IDLE:      { main: '#0ea5e9', emissive: '#0ea5e9', glow: 'rgba(14,165,233,0.6)' },
  LISTENING: { main: '#10b981', emissive: '#10b981', glow: 'rgba(16,185,129,0.7)' },
  THINKING:  { main: '#6366f1', emissive: '#6366f1', glow: 'rgba(99,102,241,0.7)'  },
  SPEAKING:  { main: '#f59e0b', emissive: '#f59e0b', glow: 'rgba(245,158,11,0.7)'  },
};

// ─── Full 3D AI Robot ──────────────────────────────────────────────────────────
const AICore3D = ({ state, isDark }: { state: AIState; isDark: boolean }) => {
  const groupRef    = useRef<THREE.Group>(null);
  const headRef     = useRef<THREE.Group>(null);
  const bodyRef     = useRef<THREE.Group>(null);
  const leftArmRef  = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const visor1Ref   = useRef<THREE.MeshStandardMaterial>(null);
  const visor2Ref   = useRef<THREE.MeshStandardMaterial>(null);
  const antennaRef  = useRef<THREE.Mesh>(null);
  const coreRef     = useRef<THREE.Mesh>(null);
  const ring1Ref    = useRef<THREE.Mesh>(null);
  const ring2Ref    = useRef<THREE.Mesh>(null);

  const colors = stateColor[state];
  const bodyColor  = isDark ? '#c8d0e0' : '#1e293b';
  const accentColor = isDark ? '#e2e8f0' : '#334155';

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!groupRef.current || !headRef.current) return;

    // Global float
    groupRef.current.position.y = Math.sin(t * 1.8) * 0.08;

    // Antenna glow pulse
    if (antennaRef.current) {
      const mat = antennaRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 + Math.sin(t * 4) * 0.8;
    }

    // Core sphere pulse
    if (coreRef.current) {
      const scale = 1 + Math.sin(t * 3) * 0.06;
      coreRef.current.scale.setScalar(scale);
    }

    // Orbit rings
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 1.2;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.9;

    // Per-state animations
    switch (state) {
      case 'IDLE':
        headRef.current.rotation.y = Math.sin(t * 0.6) * 0.35;
        headRef.current.rotation.x = Math.sin(t * 0.9) * 0.08;
        leftArmRef.current!.rotation.z  =  0.1 + Math.sin(t * 1.5) * 0.06;
        rightArmRef.current!.rotation.z = -0.1 - Math.cos(t * 1.5) * 0.06;
        break;
      case 'LISTENING':
        headRef.current.rotation.y = 0;
        headRef.current.rotation.z = 0.18;
        headRef.current.rotation.x = 0.1;
        leftArmRef.current!.rotation.z  =  0.25 + Math.sin(t * 8) * 0.04;
        rightArmRef.current!.rotation.z = -0.25 - Math.sin(t * 8) * 0.04;
        break;
      case 'THINKING':
        headRef.current.rotation.y = t * 2.2;
        headRef.current.rotation.x = 0.2;
        leftArmRef.current!.rotation.z  =  0.1 + Math.sin(t * 6) * 0.12;
        rightArmRef.current!.rotation.z = -0.1 - Math.cos(t * 6) * 0.12;
        break;
      case 'SPEAKING':
        headRef.current.rotation.x = Math.sin(t * 14) * 0.14;
        headRef.current.rotation.y = Math.sin(t * 2.5) * 0.22;
        leftArmRef.current!.rotation.z  =  0.1 + Math.sin(t * 12) * 0.14;
        rightArmRef.current!.rotation.z = -0.1 - Math.sin(t * 12 + Math.PI) * 0.14;
        break;
    }
  });

  return (
    <group ref={groupRef} scale={0.42}>
      {/* ── Ambient sparkles ── */}
      <Sparkles count={18} scale={2.5} size={1.8} speed={0.5} opacity={0.6} color={colors.main} />

      {/* ── Orbit rings ── */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.5, 0.022, 8, 60]} />
        <meshBasicMaterial color={colors.main} transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[1.7, 0.015, 8, 60]} />
        <meshBasicMaterial color={isDark ? '#6366f1' : '#a78bfa'} transparent opacity={0.25} />
      </mesh>

      {/* ── HEAD ── */}
      <group ref={headRef} position={[0, 1.25, 0]}>
        {/* Helmet */}
        <mesh castShadow>
          <sphereGeometry args={[0.62, 40, 40]} />
          <meshPhysicalMaterial
            color={bodyColor}
            metalness={0.7}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={1}
          />
        </mesh>

        {/* Faceplate (flat front panel) */}
        <mesh position={[0, 0, 0.5]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.9, 0.6, 0.06]} />
          <meshPhysicalMaterial
            color={isDark ? '#0f172a' : '#f8fafc'}
            metalness={0.1}
            roughness={0.3}
          />
        </mesh>

        {/* Visor Left Eye */}
        <mesh position={[-0.2, 0.08, 0.56]}>
          <sphereGeometry args={[0.11, 20, 20]} />
          <meshStandardMaterial
            ref={visor1Ref}
            color={colors.main}
            emissive={colors.emissive}
            emissiveIntensity={2.5}
            toneMapped={false}
          />
        </mesh>

        {/* Visor Right Eye */}
        <mesh position={[0.2, 0.08, 0.56]}>
          <sphereGeometry args={[0.11, 20, 20]} />
          <meshStandardMaterial
            ref={visor2Ref}
            color={colors.main}
            emissive={colors.emissive}
            emissiveIntensity={2.5}
            toneMapped={false}
          />
        </mesh>

        {/* Mouth bar */}
        <mesh position={[0, -0.15, 0.56]}>
          <boxGeometry args={[0.4, 0.04, 0.04]} />
          <meshStandardMaterial
            color={colors.main}
            emissive={colors.emissive}
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.35, 12]} />
          <meshStandardMaterial color={accentColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh ref={antennaRef} position={[0, 0.92, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color={colors.main}
            emissive={colors.emissive}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>

        {/* Ear plates */}
        {[-1, 1].map(side => (
          <mesh key={side} position={[side * 0.65, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.18, 16]} />
            <meshPhysicalMaterial color={accentColor} metalness={0.8} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* ── NECK ── */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.35, 16]} />
        <meshPhysicalMaterial color={accentColor} metalness={0.6} roughness={0.2} />
      </mesh>

      {/* ── BODY ── */}
      <group ref={bodyRef} position={[0, -0.3, 0]}>
        {/* Torso */}
        <mesh castShadow>
          <boxGeometry args={[1.1, 1.4, 0.65]} />
          <meshPhysicalMaterial
            color={bodyColor}
            metalness={0.6}
            roughness={0.15}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Chest core glow */}
        <mesh ref={coreRef} position={[0, 0.15, 0.34]}>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial
            color={colors.main}
            emissive={colors.emissive}
            emissiveIntensity={2.2}
            toneMapped={false}
          />
        </mesh>

        {/* Chest panel lines */}
        {[-0.25, 0.25].map(x => (
          <mesh key={x} position={[x, -0.1, 0.34]}>
            <boxGeometry args={[0.06, 0.5, 0.04]} />
            <meshStandardMaterial
              color={colors.main}
              emissive={colors.emissive}
              emissiveIntensity={1}
              toneMapped={false}
            />
          </mesh>
        ))}

        {/* Waist band */}
        <mesh position={[0, -0.72, 0]}>
          <boxGeometry args={[1.15, 0.15, 0.7]} />
          <meshPhysicalMaterial color={accentColor} metalness={0.8} roughness={0.1} />
        </mesh>
      </group>

      {/* ── LEFT ARM ── */}
      <group ref={leftArmRef} position={[-0.75, -0.1, 0]} rotation={[0, 0, 0.1]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.18, 0.85, 16, 16]} />
          <meshPhysicalMaterial color={bodyColor} metalness={0.5} roughness={0.15} clearcoat={0.6} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.62, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshPhysicalMaterial color={accentColor} metalness={0.7} roughness={0.1} />
        </mesh>
      </group>

      {/* ── RIGHT ARM ── */}
      <group ref={rightArmRef} position={[0.75, -0.1, 0]} rotation={[0, 0, -0.1]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.18, 0.85, 16, 16]} />
          <meshPhysicalMaterial color={bodyColor} metalness={0.5} roughness={0.15} clearcoat={0.6} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.62, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshPhysicalMaterial color={accentColor} metalness={0.7} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
};

// ─── Button wrapper with glow ring ────────────────────────────────────────────
const AbhiAIRobot = ({ isDark }: AbhiAIRobotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [aiState, setAiState] = useState<AIState>('IDLE');
  const [isVisible, setIsVisible] = useState(false);
  const { messages, sendMessage, toggleRecording, isRecording, playTTS } = useAbhiAI(setAiState);
  const hasGreetedRef = useRef(false);

  useEffect(() => {
    const handleFirstInteraction = async () => {
      if (hasGreetedRef.current) return;
      hasGreetedRef.current = true;
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

  const colors = stateColor[aiState];

  return (
    <div className="relative flex flex-col items-center z-50">
      <div className="group relative flex flex-col items-center justify-center gap-1.5">
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={e => { e.preventDefault(); setIsOpen(!isOpen); }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              aria-label="Ask Abhi AI"
              className="relative w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: isDark
                  ? 'radial-gradient(circle, #070f1f 60%, #0a1628)'
                  : 'radial-gradient(circle, #f0f4ff 60%, #e8ecff)',
                boxShadow: `0 0 0 1px ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}, 0 0 20px ${colors.glow}, 0 4px 20px rgba(0,0,0,0.3)`,
              }}
            >
              {/* Animated glow rings */}
              {[0, 1].map(i => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full"
                  style={{ border: `1.5px solid ${colors.main}` }}
                  animate={{
                    scale: aiState === 'IDLE' ? 1 : [1, 1.5 + i * 0.3, 1],
                    opacity: aiState === 'IDLE' ? 0.25 : [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: aiState === 'THINKING' ? 0.6 : 1.4,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: 'easeOut',
                  }}
                />
              ))}

              {/* 3D Robot Canvas */}
              <div className="w-12 h-12 rounded-full overflow-hidden pointer-events-none">
                <Canvas
                  camera={{ position: [0, 0.3, 3.2], fov: 45 }}
                  gl={{ antialias: true, alpha: true }}
                  dpr={[1, 2]}
                >
                  <ambientLight intensity={isDark ? 0.5 : 0.8} />
                  <directionalLight position={[3, 5, 5]} intensity={isDark ? 1.2 : 1.8} color="#ffffff" />
                  <pointLight position={[-3, 2, 2]} intensity={3} color={colors.main} distance={8} />
                  <pointLight position={[3, -2, 1]} intensity={2} color={isDark ? '#6366f1' : '#818cf8'} distance={8} />
                  <AICore3D state={aiState} isDark={isDark} />
                </Canvas>
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {isVisible && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase"
            style={{ color: isDark ? colors.main : '#6366f1', textShadow: isDark ? `0 0 8px ${colors.glow}` : 'none' }}
          >
            Abhi AI
          </motion.span>
        )}

        {/* Placeholder to prevent layout shift */}
        {!isVisible && <div className="w-14 h-14" />}
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
