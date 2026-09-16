import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

// ─── PROFESSIONAL COLOR PALETTE ───────────────────────────────────
// More subtle, premium colors compared to standard neon
const NODES = [
  { id: "skills", label: "SKILLS", sub: "TOOLS · TECH · GROWTH", color: "#d97706", pos: [0, 3.8, 0.5] as [number, number, number] }, // amber
  { id: "about", label: "ABOUT", sub: "IDEAS · VALUES · JOURNEY", color: "#0ea5e9", pos: [-4.2, 1.4, -0.3] as [number, number, number] }, // sky
  { id: "experience", label: "EXPERIENCE", sub: "LEARN · BUILD · GROW", color: "#10b981", pos: [4.2, 1.4, -0.3] as [number, number, number] }, // emerald
  { id: "projects", label: "PROJECTS", sub: "IDEAS · TO · IMPACT", color: "#6366f1", pos: [-4.2, -1.6, 0.3] as [number, number, number] }, // indigo
  { id: "contact", label: "CONTACT", sub: "LET'S · COLLABORATE", color: "#f43f5e", pos: [4.2, -1.6, 0.3] as [number, number, number] }, // rose
  { id: "github", label: "GITHUB", sub: "THINK · CREATE · REPEAT", color: "#8b5cf6", pos: [0, -3.8, 0.5] as [number, number, number] }, // violet
];

const PLANET_R = 1.38;

// ─── ORBIT RING ───────────────────────────────────────────────────
const Ring = ({ r, tilt, speed, color, opacity, thickness = 0.012 }: {
  r: number; tilt: number; speed: number; color: string; opacity: number; thickness?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.z += d * speed; });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[r, thickness, 2, 220]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} transparent opacity={opacity} />
    </mesh>
  );
};

// ─── NEBULA ───────────────────────────────────────────────────────
const Nebula = ({ position, color, scale }: {
  position: [number, number, number]; color: string; scale: number;
}) => (
  <mesh position={position} scale={scale}>
    <sphereGeometry args={[1, 10, 10]} />
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35}
      transparent opacity={0.04} depthWrite={false} />
  </mesh>
);

// ─── ASTEROID DUST BELT ───────────────────────────────────────────
const DustBelt = ({ isDark }: { isDark: boolean }) => {
  const ref = useRef<THREE.Points>(null);
  const count = 280;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 2.5 + Math.random() * 3.3;
      const y = (Math.random() - 0.5) * 1.2;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * r * 0.5;
      const warm = Math.random() > 0.55;
      col[i * 3] = warm ? 0.85 : 0.70;
      col[i * 3 + 1] = warm ? 0.65 : 0.75;
      col[i * 3 + 2] = warm ? 0.30 : 0.95;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.012; });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.038} vertexColors transparent opacity={isDark ? 0.55 : 0.15} sizeAttenuation depthWrite={false} />
    </points>
  );
};

// ─── CENTER PLANET ────────────────────────────────────────────────
const CenterPlanet = ({ isDark }: { isDark: boolean }) => {
  const planetBaseColor = isDark ? "#06101e" : "#e5e0d8";
  const imageBgColor = isDark ? "#06101e" : "#f7f3ed";

  return (
    <group>
      {/* Planet base */}
      <mesh>
        <sphereGeometry args={[PLANET_R, 64, 64]} />
        <meshStandardMaterial color={planetBaseColor} roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Amber atmosphere rim */}
      <mesh>
        <sphereGeometry args={[PLANET_R * 1.07, 32, 32]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.55}
          transparent opacity={isDark ? 0.09 : 0.04} side={THREE.BackSide} />
      </mesh>

      <Html
        center
        distanceFactor={7.9}
        style={{ pointerEvents: "none", userSelect: "none" }}
        zIndexRange={[0, 0]}
      >
        <div style={{
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          overflow: "hidden",
          border: `3px solid ${isDark ? 'rgba(212, 175, 135, 0.88)' : 'rgba(212, 175, 135, 0.5)'}`,
          boxShadow: isDark ? [
            "0 0 0 7px rgba(212,165,116,0.11)",
            "0 0 38px rgba(212,165,116,0.38)",
            "0 0 75px rgba(212,165,116,0.13)",
            "inset 0 0 28px rgba(0,0,0,0.42)",
          ].join(", ") : "0 0 20px rgba(0,0,0,0.05)",
        }}>
          <img
            src="/dp_abhi.png"
            alt="Abhishek H S"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
              background: imageBgColor,
            }}
          />
        </div>
      </Html>

      <pointLight color="#d4a574" intensity={isDark ? 18 : 10} distance={11} />
    </group>
  );
};

// ─── SECTION NODE ─────────────────────────────────────────────────
const SectionNode = ({ node, onClick, isDark }: { node: typeof NODES[0]; onClick: () => void; isDark: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(Math.random() * Math.PI * 2);

  useFrame((_, d) => {
    timeRef.current += d;
    if (groupRef.current) {
      groupRef.current.position.y = node.pos[1] + Math.sin(timeRef.current * 0.52) * 0.14;
    }
    if (coreRef.current) coreRef.current.rotation.y += d * 0.38;
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [hovered]);

  const textColor = isDark ? (hovered ? "#ffffff" : "rgba(255,255,255,0.85)") : (hovered ? "#000000" : "rgba(0,0,0,0.75)");
  const textShadow = isDark 
    ? (hovered ? `0 0 20px ${node.color}, 0 0 8px ${node.color}` : "0 1px 8px rgba(0,0,0,0.8)")
    : (hovered ? "0 1px 4px rgba(0,0,0,0.1)" : "none");

  return (
    <group
      ref={groupRef}
      position={node.pos}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Outer glow halo */}
      <mesh>
        <sphereGeometry args={[hovered ? 0.80 : 0.62, 18, 18]} />
        <meshStandardMaterial
          color={node.color} emissive={node.color}
          emissiveIntensity={hovered ? 1.0 : (isDark ? 0.40 : 0.1)}
          transparent opacity={hovered ? 0.28 : (isDark ? 0.14 : 0.05)}
        />
      </mesh>

      {/* Core orb - sleek metallic look */}
      <mesh ref={coreRef} scale={hovered ? 1.20 : 1}>
        <sphereGeometry args={[0.40, 32, 32]} />
        <meshStandardMaterial
          color={isDark ? node.color : "#ffffff"} 
          emissive={node.color}
          emissiveIntensity={hovered ? 2.0 : (isDark ? 0.90 : 0.4)}
          metalness={isDark ? 0.3 : 0.8} 
          roughness={isDark ? 0.1 : 0.2}
        />
      </mesh>

      {/* Equatorial ring accent */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.43, 0.020, 8, 60]} />
        <meshStandardMaterial
          color={node.color} emissive={node.color}
          emissiveIntensity={hovered ? 2.0 : (isDark ? 0.80 : 0.4)}
          transparent opacity={hovered ? 1.0 : (isDark ? 0.60 : 0.3)}
        />
      </mesh>

      {hovered && <pointLight color={node.color} intensity={isDark ? 10 : 5} distance={4.5} />}

      {/* Label */}
      <Html center distanceFactor={12} position={[0, -0.85, 0]}
        style={{ pointerEvents: "none", userSelect: "none" }}>
        <div style={{ textAlign: "center", width: "160px", transform: "translateX(-50%)" }}>
          <p style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "12.5px",
            fontWeight: 700,
            letterSpacing: "0.24em",
            color: textColor,
            margin: 0,
            textShadow: textShadow,
            transition: "all 0.22s ease",
          }}>{node.label}</p>
          <p style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "7.5px",
            letterSpacing: "0.18em",
            color: hovered ? node.color : (isDark ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.45)"),
            margin: "4px 0 0",
            textTransform: "uppercase",
            transition: "color 0.22s ease",
          }}>{node.sub}</p>
        </div>
      </Html>
    </group>
  );
};

// ─── CONNECTION LINE ──────────────────────────────────────────────
const ConnectionLine = ({ to, color, isDark }: { to: [number, number, number]; color: string; isDark: boolean }) => {
  const geo = useMemo(() => {
    const full = new THREE.Vector3(...to);
    const dir = full.clone().normalize();
    const start = dir.clone().multiplyScalar(PLANET_R * 1.05);
    const end = dir.clone().multiplyScalar(full.length() * 0.72);
    return new THREE.BufferGeometry().setFromPoints([start, end]);
  }, [to]);

  return (
    <line geometry={geo}>
      <lineBasicMaterial color={isDark ? color : "#000000"} transparent opacity={isDark ? 0.22 : 0.08} />
    </line>
  );
};

// ─── FULL SCENE ───────────────────────────────────────────────────
const SolarScene = ({ onNodeClick, isDark }: { onNodeClick: (id: string) => void; isDark: boolean }) => {
  const bgColor = isDark ? "#101726" : "#f7f3ed";
  
  return (
    <>
      <ambientLight intensity={isDark ? 0.50 : 0.9} />
      <directionalLight position={[8, 6, 5]} intensity={isDark ? 1.0 : 1.5} color="#f0e8d8" />
      
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[bgColor, 22, 55]} />

      {isDark && (
        <>
          <pointLight position={[-10, 5, -5]} intensity={5} color="#3050cc" distance={30} />
          <pointLight position={[10, -4, 6]} intensity={3.0} color="#cc4010" distance={22} />
          <Stars radius={120} depth={70} count={5500} factor={3.5} saturation={0.15} fade speed={0.10} />
          <Nebula position={[-18, 8, -30]} color="#4060cc" scale={12} />
          <Nebula position={[22, -6, -25]} color="#8040a0" scale={9} />
        </>
      )}

      {/* Dust belt */}
      <DustBelt isDark={isDark} />

      {/* Orbit rings */}
      <Ring r={2.8} tilt={0.25} speed={0.04} color={isDark ? "#d4a574" : "#888"} opacity={isDark ? 0.18 : 0.06} thickness={0.013} />
      <Ring r={4.5} tilt={0.18} speed={-0.03} color={isDark ? "#7c6fa0" : "#888"} opacity={isDark ? 0.13 : 0.04} thickness={0.011} />
      <Ring r={5.9} tilt={0.11} speed={0.02} color={isDark ? "#d4a574" : "#888"} opacity={isDark ? 0.08 : 0.03} thickness={0.010} />

      {/* Connection lines */}
      {NODES.map((n) => <ConnectionLine key={n.id} to={n.pos} color={n.color} isDark={isDark} />)}

      {/* Center planet */}
      <CenterPlanet isDark={isDark} />

      {/* Section nodes */}
      {NODES.map((n) => (
        <SectionNode key={n.id} node={n} onClick={() => onNodeClick(n.id)} isDark={isDark} />
      ))}
    </>
  );
};

// ─── SECTION WRAPPER ─────────────────────────────────────────────
const SolarSystem = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleClick = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="solar-system" className="relative overflow-hidden bg-background theme-transition" style={{ height: "100vh" }}>

      {/* "A Curiosity" — lower with breathing room */}
      <div className="absolute bottom-4 inset-x-0 z-10 flex flex-col items-center pb-3 pointer-events-none">
        <div className="w-16 h-px bg-foreground/10 mb-5" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground/80 tracking-widest">
          A <em className="text-foreground/90">Curiosity</em>
        </h2>
        <p className="text-[9px] font-mono text-muted-foreground mt-3 tracking-[0.40em] uppercase">
          Driven Universe · Click any node to explore
        </p>
        <div className="w-16 h-px bg-foreground/10 mt-5" />
      </div>

      {/* Side label */}
      <div className="absolute left-5 top-1/2 z-10 pointer-events-none hidden xl:block"
        style={{ transform: "translateY(-50%) rotate(-90deg)", transformOrigin: "center" }}>
        <span className="text-[8px] font-mono text-muted-foreground/60 tracking-[0.45em] uppercase whitespace-nowrap">
          Explore My Universe
        </span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
        style={{ position: "absolute", inset: 0 }}
      >
        <SolarScene onNodeClick={handleClick} isDark={isDark} />
      </Canvas>
    </section>
  );
};

export default SolarSystem;
