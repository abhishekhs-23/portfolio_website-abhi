import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

// Fibonacci sphere distribution for 3D placement
const fibonacciSphere = (n: number, radius: number): [number, number, number][] => {
  const points: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push([r * Math.cos(theta) * radius, y * radius, r * Math.sin(theta) * radius]);
  }
  return points;
};

// A single skill node
const SkillNode = ({
  position,
  label,
  emoji,
  color,
  isDark,
  index,
}: {
  position: [number, number, number];
  label: string;
  emoji: string;
  color: string;
  isDark: boolean;
  index: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.4;
      meshRef.current.rotation.y = t * 0.6;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3 + index;
      // Pulsing scale
      const pulse = 1 + Math.sin(t * 2 + index) * 0.15;
      ringRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <Float speed={1.2 + index * 0.1} rotationIntensity={0.15} floatIntensity={0.3}>
      <group position={position}>
        {/* Pulsing outer ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[0.28, 0.008, 8, 40]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>

        {/* Wireframe icosahedron */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.2, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isDark ? 0.5 : 0.8}
            wireframe
            transparent
            opacity={isDark ? 0.5 : 0.7}
          />
        </mesh>

        {/* Inner solid sphere */}
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isDark ? 0.8 : 0.5}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Emoji */}
        <Html center style={{ pointerEvents: "none", userSelect: "none" }}>
          <div style={{ fontSize: "20px" }}>{emoji}</div>
        </Html>

        {/* Label */}
        <Html center position={[0, -0.5, 0]} style={{ pointerEvents: "none", userSelect: "none" }}>
          <div style={{ textAlign: "center", width: "100px" }}>
            <p style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.8)",
              margin: 0,
              textShadow: isDark ? `0 0 12px ${color}` : "0 1px 4px rgba(0,0,0,0.2)",
              whiteSpace: "nowrap",
            }}>
              {label}
            </p>
          </div>
        </Html>
      </group>
    </Float>
  );
};

// Pulsing connection lines
const PulsingLines = ({
  positions,
  isDark,
}: {
  positions: [number, number, number][];
  isDark: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
        mat.opacity = 0.05 + Math.abs(Math.sin(state.clock.getElapsedTime() * 0.8 + i * 0.3)) * 0.12;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(...pos),
        ]);
        return (
          <line key={i} geometry={geo}>
            <lineBasicMaterial
              color={isDark ? "#f59e0b" : "#888888"}
              transparent
              opacity={0.08}
            />
          </line>
        );
      })}
    </group>
  );
};

// Rotating rings around the orb
const OrbRings = ({ isDark }: { isDark: boolean }) => {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) ring1.current.rotation.z = t * 0.3;
    if (ring2.current) ring2.current.rotation.x = t * 0.2;
    if (ring3.current) ring3.current.rotation.y = t * 0.25;
  });

  return (
    <>
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2, 0.005, 8, 100]} />
        <meshBasicMaterial color={isDark ? "#f59e0b" : "#888"} transparent opacity={0.12} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.5, 0.004, 8, 100]} />
        <meshBasicMaterial color={isDark ? "#6366f1" : "#aaa"} transparent opacity={0.08} />
      </mesh>
      <mesh ref={ring3} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[2.9, 0.004, 8, 100]} />
        <meshBasicMaterial color={isDark ? "#22d3ee" : "#999"} transparent opacity={0.08} />
      </mesh>
    </>
  );
};

// Central core
const CentralCore = ({ isDark }: { isDark: boolean }) => {
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (outerRef.current) {
      outerRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      outerRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={0.6} rotationIntensity={0.3} floatIntensity={0.2}>
      {/* Inner bright core */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#d4a574"
          emissive="#d4a574"
          emissiveIntensity={isDark ? 1.2 : 0.6}
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
      {/* Outer wireframe shell */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.2}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
};

// Main scene
const GalaxyScene = ({ isDark }: { isDark: boolean }) => {
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
    { label: "TypeScript", emoji: "📘", color: "#60a5fa" },
    { label: "OpenCV", emoji: "👁️", color: "#fb7185" },
  ];

  const positions = useMemo(() => fibonacciSphere(rawSkills.length, 2.8), []);

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI * 0.15}
        maxPolarAngle={Math.PI * 0.85}
      />

      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.8 : 1.0} color="#f5f0e8" />
      <pointLight position={[-3, 2, 2]} intensity={3} color="#d4a574" distance={15} />
      <pointLight position={[3, -2, -2]} intensity={2} color="#6366f1" distance={15} />
      <pointLight position={[0, 0, 4]} intensity={1.5} color="#22d3ee" distance={12} />

      {/* Ambient sparkles inside the orb */}
      <Sparkles count={80} scale={6} size={1.5} speed={0.3} opacity={0.4} color="#f59e0b" />

      {/* Rotating orbit rings */}
      <OrbRings isDark={isDark} />

      {/* Pulsing connection lines */}
      <PulsingLines positions={positions} isDark={isDark} />

      {/* Skill nodes */}
      {rawSkills.map((skill, i) => (
        <SkillNode
          key={skill.label}
          position={positions[i]}
          label={skill.label}
          emoji={skill.emoji}
          color={skill.color}
          isDark={isDark}
          index={i}
        />
      ))}

      {/* Central core */}
      <CentralCore isDark={isDark} />
    </>
  );
};

const SkillsOrb = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-full h-[480px] md:h-[560px] relative rounded-2xl overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, rgba(212,165,116,0.08) 0%, rgba(99,102,241,0.04) 50%, transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(180,120,60,0.1) 0%, transparent 70%)",
        }}
      />
      {/* Subtle border */}
      <div className="absolute inset-0 rounded-2xl border border-foreground/8 pointer-events-none z-10" />

      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <GalaxyScene isDark={isDark} />
      </Canvas>

      {/* Drag hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground/50 tracking-widest uppercase pointer-events-none">
        drag to rotate
      </div>
    </div>
  );
};

export default SkillsOrb;
