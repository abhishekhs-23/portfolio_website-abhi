import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

// A single skill node (floating sphere with label)
const SkillNode = ({
  position,
  label,
  color,
  size = 0.22,
  speed = 1.2,
}: {
  position: [number, number, number];
  label: string;
  color: string;
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

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={position}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[size, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.35}
            metalness={0.6}
            roughness={0.3}
            wireframe={false}
          />
        </mesh>
        {/* Wireframe shell */}
        <mesh>
          <icosahedronGeometry args={[size * 1.18, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.12}
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
        <Text
          position={[0, -(size + 0.18), 0]}
          fontSize={0.13}
          color="white"
          anchorX="center"
          anchorY="top"
          outlineWidth={0.005}
          outlineColor="#000000"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
};

// Connecting lines between nodes
const ConnectionLines = ({ nodes }: { nodes: [number, number, number][] }) => {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const points: number[] = [];
    // Connect select pairs (first ring to center, etc.)
    const pairs = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      [0, 3], [1, 4], [2, 5],
      [6, 0], [6, 1], [6, 2],
      [7, 3], [7, 4], [7, 5],
    ];
    pairs.forEach(([a, b]) => {
      if (nodes[a] && nodes[b]) {
        points.push(...nodes[a], ...nodes[b]);
      }
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, [nodes]);

  useFrame((state) => {
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.08 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.04;
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#d4a574" transparent opacity={0.1} />
    </lineSegments>
  );
};

// Main scene
const BrainScene = ({ isDark }: { isDark: boolean }) => {
  const skills = [
    { label: "Python", color: "#3b82f6", pos: [2.0, 0.5, 0.0] as [number, number, number] },
    { label: "React", color: "#22d3ee", pos: [1.0, 1.8, 0.8] as [number, number, number] },
    { label: "ML", color: "#a78bfa", pos: [-1.0, 1.6, 0.5] as [number, number, number] },
    { label: "RAG", color: "#f59e0b", pos: [-2.0, 0.2, -0.3] as [number, number, number] },
    { label: "OpenCV", color: "#34d399", pos: [-1.2, -1.5, 0.6] as [number, number, number] },
    { label: "Node.js", color: "#86efac", pos: [1.2, -1.6, 0.4] as [number, number, number] },
    { label: "LLMs", color: "#fb923c", pos: [0.0, 0.8, 2.2] as [number, number, number] },
    { label: "SQL", color: "#c084fc", pos: [0.0, 0.6, -2.2] as [number, number, number] },
  ];

  const nodePositions = skills.map((s) => s.pos);

  return (
    <>
      <ambientLight intensity={isDark ? 0.4 : 0.6} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.8 : 1.0} color="#f5f0e8" />
      <pointLight position={[-3, 2, 2]} intensity={2} color="#d4a574" distance={10} />
      <pointLight position={[3, -2, -2]} intensity={1.5} color="#6366f1" distance={10} />

      <ConnectionLines nodes={nodePositions} />

      {skills.map((skill) => (
        <SkillNode
          key={skill.label}
          position={skill.pos}
          label={skill.label}
          color={skill.color}
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

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
      />
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
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <BrainScene isDark={isDark} />
      </Canvas>
      <p className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground opacity-50">
        Drag to explore · Auto-rotating
      </p>
    </div>
  );
};

export default SkillsOrb;
