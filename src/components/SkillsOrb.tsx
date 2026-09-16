import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

// A single skill node (floating emoji with label and wireframe)
const SkillNode = ({
  position,
  label,
  emoji,
  color,
  isDark,
  size = 0.22,
  speed = 1.2,
}: {
  position: [number, number, number];
  label: string;
  emoji: string;
  color: string;
  isDark: boolean;
  size?: number;
  speed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3 * speed;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5 * speed;
    }
  });

  const textColor = isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)";
  const textShadow = isDark 
    ? `0 1px 8px rgba(0,0,0,0.9)` 
    : `0 1px 4px rgba(0,0,0,0.2)`;

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.4}>
      <group position={position}>
        {/* Wireframe shell around the emoji */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[size * 1.3, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isDark ? 0.3 : 0.6}
            wireframe
            transparent
            opacity={isDark ? 0.3 : 0.5}
          />
        </mesh>
        
        {/* Emoji in the center */}
        <Html center style={{ pointerEvents: "none", userSelect: "none" }}>
          <div style={{ fontSize: "28px", transform: "translateY(5%)" }}>
            {emoji}
          </div>
        </Html>

        {/* Label perfectly aligned below */}
        <Html center position={[0, -0.45, 0]} style={{ pointerEvents: "none", userSelect: "none" }}>
          <div style={{ textAlign: "center", width: "120px" }}>
            <p style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: textColor,
              margin: 0,
              textShadow: textShadow,
            }}>{label}</p>
          </div>
        </Html>
      </group>
    </Float>
  );
};

// Main scene
const BrainScene = ({ isDark }: { isDark: boolean }) => {
  // Dynamically place any number of skills in a perfect circle
  const R = 2.4;
  const rawSkills = [
    { label: "Python", emoji: "🐍", color: "#3b82f6" },
    { label: "React", emoji: "⚛️", color: "#22d3ee" },
    { label: "FastAPI", emoji: "⚡", color: "#86efac" },
    { label: "SQL", emoji: "🗄️", color: "#c084fc" },
    { label: "LLMs", emoji: "🤖", color: "#fb923c" },
    { label: "RAG", emoji: "📚", color: "#f59e0b" },
    { label: "Machine Learning", emoji: "🧠", color: "#a78bfa" },
    { label: "NLP", emoji: "🔤", color: "#f43f5e" },
    { label: "Docker", emoji: "🐳", color: "#0ea5e9" },
    { label: "Supabase", emoji: "🗃️", color: "#10b981" },
  ];

  const skills = rawSkills.map((s, i) => {
    const angle = (i / rawSkills.length) * Math.PI * 2 - Math.PI / 2;
    return {
      ...s,
      pos: [Math.cos(angle) * R, Math.sin(angle) * -R, 0] as [number, number, number],
    };
  });

  return (
    <>
      <ambientLight intensity={isDark ? 0.4 : 0.6} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.8 : 1.0} color="#f5f0e8" />
      <pointLight position={[-3, 2, 2]} intensity={2} color="#d4a574" distance={10} />
      <pointLight position={[3, -2, -2]} intensity={1.5} color="#6366f1" distance={10} />

      {/* A neat circular track line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R, 0.005, 16, 100]} />
        <meshBasicMaterial color={isDark ? "#d4a574" : "#888888"} transparent opacity={isDark ? 0.15 : 0.08} />
      </mesh>

      {/* Connections to center */}
      {skills.map((skill, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(...skill.pos)
        ]);
        return (
          <line key={`line-${i}`} geometry={geo}>
            <lineBasicMaterial color={isDark ? "#d4a574" : "#888888"} transparent opacity={isDark ? 0.1 : 0.05} />
          </line>
        );
      })}

      {skills.map((skill) => (
        <SkillNode
          key={skill.label}
          position={skill.pos}
          label={skill.label}
          emoji={skill.emoji}
          color={skill.color}
          isDark={isDark}
          size={0.22}
          speed={0.8 + Math.random() * 0.5}
        />
      ))}

      {/* Central core */}
      <Float speed={0.6} rotationIntensity={0.3} floatIntensity={0.2}>
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color="#d4a574"
            emissive="#d4a574"
            emissiveIntensity={isDark ? 0.6 : 0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={0.1}
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>
      </Float>
    </>
  );
};

const SkillsOrb = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-full h-[420px] md:h-[520px] relative rounded-2xl overflow-hidden">
      {/* Subtle glow behind canvas */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, rgba(212,165,116,0.06) 0%, transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(180,120,60,0.08) 0%, transparent 70%)",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <BrainScene isDark={isDark} />
      </Canvas>
    </div>
  );
};

export default SkillsOrb;
