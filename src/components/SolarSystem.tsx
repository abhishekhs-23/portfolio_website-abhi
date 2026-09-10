import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Html } from "@react-three/drei";
import * as THREE from "three";

// ─── HEX NODE LAYOUT ─────────────────────────────────────────────
const NODES = [
  { id: "skills", label: "SKILLS", sub: "TOOLS · TECH · GROWTH", color: "#ec4899", pos: [0, 3.8, 0.5] as [number, number, number] },
  { id: "about", label: "ABOUT", sub: "IDEAS · VALUES · JOURNEY", color: "#f59e0b", pos: [-4.2, 1.4, -0.3] as [number, number, number] },
  { id: "experience", label: "EXPERIENCE", sub: "LEARN · BUILD · GROW", color: "#22d3ee", pos: [4.2, 1.4, -0.3] as [number, number, number] },
  { id: "projects", label: "PROJECTS", sub: "IDEAS · TO · IMPACT", color: "#3b82f6", pos: [-4.2, -1.6, 0.3] as [number, number, number] },
  { id: "contact", label: "CONTACT", sub: "LET'S · COLLABORATE", color: "#a78bfa", pos: [4.2, -1.6, 0.3] as [number, number, number] },
  { id: "github", label: "GITHUB", sub: "THINK · CREATE · REPEAT", color: "#34d399", pos: [0, -3.8, 0.5] as [number, number, number] },
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
const DustBelt = () => {
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
      <pointsMaterial size={0.038} vertexColors transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
};

// ─── CENTER PLANET ────────────────────────────────────────────────
// Uses Html billboard so the photo is always pixel-perfect — no sphere UV distortion.
const CenterPlanet = () => {
  const ringRef = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ringRef.current) ringRef.current.rotation.z += d * 0.055; });

  return (
    <group>
      {/* Dark planet base */}
      <mesh>
        <sphereGeometry args={[PLANET_R, 64, 64]} />
        <meshStandardMaterial color="#06101e" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Amber atmosphere rim */}
      <mesh>
        <sphereGeometry args={[PLANET_R * 1.07, 32, 32]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.55}
          transparent opacity={0.09} side={THREE.BackSide} />
      </mesh>

      {/* ── Profile photo as HTML billboard ──────────────────────────
          Always faces the camera, always pixel-sharp. No sphere distortion. */}
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
          border: "3px solid rgba(212, 175, 135, 0.88)",
          boxShadow: [
            "0 0 0 7px rgba(212,165,116,0.11)",
            "0 0 38px rgba(212,165,116,0.38)",
            "0 0 75px rgba(212,165,116,0.13)",
            "inset 0 0 28px rgba(0,0,0,0.42)",
          ].join(", "),
        }}>
          <img
            src="/dp_abhi.png"
            alt="Abhishek H S"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
              background: "#06101e",
            }}
          />
        </div>
      </Html>

      {/* Saturn rings */}
      <group ref={ringRef} rotation={[0.35, 0, 0]}>
        {[
          { r: PLANET_R * 1.28, t: 0.18, color: "#d4a574", op: 0.58 },
          { r: PLANET_R * 1.47, t: 0.14, color: "#c08040", op: 0.42 },
          { r: PLANET_R * 1.64, t: 0.09, color: "#b06828", op: 0.26 },
          { r: PLANET_R * 1.78, t: 0.06, color: "#f59e0b", op: 0.14 },
        ].map(({ r, t, color, op }, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r, t, 2, 160]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.40}
              transparent opacity={op} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>

      <pointLight color="#d4a574" intensity={18} distance={11} />
    </group>
  );
};

// ─── SECTION NODE ─────────────────────────────────────────────────
const SectionNode = ({ node, onClick }: { node: typeof NODES[0]; onClick: () => void }) => {
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
          emissiveIntensity={hovered ? 1.0 : 0.40}
          transparent opacity={hovered ? 0.28 : 0.14}
        />
      </mesh>

      {/* Core orb */}
      <mesh ref={coreRef} scale={hovered ? 1.20 : 1}>
        <sphereGeometry args={[0.40, 32, 32]} />
        <meshStandardMaterial
          color={node.color} emissive={node.color}
          emissiveIntensity={hovered ? 2.0 : 1.10}
          metalness={0.12} roughness={0.07}
        />
      </mesh>

      {/* Equatorial ring accent */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.43, 0.020, 8, 60]} />
        <meshStandardMaterial
          color={node.color} emissive={node.color}
          emissiveIntensity={hovered ? 2.0 : 0.80}
          transparent opacity={hovered ? 1.0 : 0.60}
        />
      </mesh>

      {hovered && <pointLight color={node.color} intensity={10} distance={4.5} />}

      {/* Label */}
      <Html center distanceFactor={12} position={[0, -0.85, 0]}
        style={{ pointerEvents: "none", userSelect: "none" }}>
        <div style={{ textAlign: "center", width: "160px", transform: "translateX(-50%)" }}>
          <p style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "12.5px",
            fontWeight: 700,
            letterSpacing: "0.24em",
            color: hovered ? "#ffffff" : "rgba(255,255,255,0.90)",
            margin: 0,
            textShadow: hovered
              ? `0 0 22px ${node.color}, 0 0 8px ${node.color}`
              : "0 1px 8px rgba(0,0,0,0.8)",
            transition: "all 0.22s ease",
          }}>{node.label}</p>
          <p style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "7.5px",
            letterSpacing: "0.18em",
            color: hovered ? node.color : "rgba(255,255,255,0.42)",
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
const ConnectionLine = ({ to, color }: { to: [number, number, number]; color: string }) => {
  const geo = useMemo(() => {
    const full = new THREE.Vector3(...to);
    const dir = full.clone().normalize();
    const start = dir.clone().multiplyScalar(PLANET_R * 1.05);
    const end = dir.clone().multiplyScalar(full.length() * 0.72);
    return new THREE.BufferGeometry().setFromPoints([start, end]);
  }, [to]);

  return (
    <line geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={0.22} />
    </line>
  );
};

// ─── FULL SCENE ───────────────────────────────────────────────────
const SolarScene = ({ onNodeClick }: { onNodeClick: (id: string) => void }) => (
  <>
    <ambientLight intensity={0.50} />
    <directionalLight position={[8, 6, 5]} intensity={1.0} color="#f0e8d8" />
    <pointLight position={[-10, 5, -5]} intensity={5} color="#3050cc" distance={30} />
    <pointLight position={[10, -4, 6]} intensity={3.0} color="#cc4010" distance={22} />

    <color attach="background" args={["#030810"]} />
    <fog attach="fog" args={["#030810", 22, 55]} />

    <Stars radius={120} depth={70} count={5500} factor={3.5} saturation={0.15} fade speed={0.10} />

    {/* Nebula clouds */}
    <Nebula position={[-18, 8, -30]} color="#4060cc" scale={12} />
    <Nebula position={[22, -6, -25]} color="#8040a0" scale={9} />

    {/* Dust belt */}
    <DustBelt />

    {/* Orbit rings */}
    <Ring r={2.8} tilt={0.25} speed={0.04} color="#d4a574" opacity={0.18} thickness={0.013} />
    <Ring r={4.5} tilt={0.18} speed={-0.03} color="#7c6fa0" opacity={0.13} thickness={0.011} />
    <Ring r={5.9} tilt={0.11} speed={0.02} color="#d4a574" opacity={0.08} thickness={0.010} />

    {/* Connection lines */}
    {NODES.map((n) => <ConnectionLine key={n.id} to={n.pos} color={n.color} />)}

    {/* Center planet */}
    <CenterPlanet />

    {/* Section nodes */}
    {NODES.map((n) => (
      <SectionNode key={n.id} node={n} onClick={() => onNodeClick(n.id)} />
    ))}
  </>
);

// ─── SECTION WRAPPER ─────────────────────────────────────────────
const SolarSystem = () => {
  const handleClick = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="solar-system" className="relative overflow-hidden" style={{ height: "100vh" }}>

      {/* "A Curiosity" — lower with breathing room */}
      <div className="absolute bottom-4 inset-x-0 z-10 flex flex-col items-center pb-3 pointer-events-none">
        <div className="w-16 h-px bg-white/10 mb-5" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white/70 tracking-widest">
          A <em>Curiosity</em>
        </h2>
        <p className="text-[9px] font-mono text-white/28 mt-3 tracking-[0.40em] uppercase">
          Driven Universe · Click any node to explore
        </p>
        <div className="w-16 h-px bg-white/10 mt-5" />
      </div>

      {/* Side label */}
      <div className="absolute left-5 top-1/2 z-10 pointer-events-none hidden xl:block"
        style={{ transform: "translateY(-50%) rotate(-90deg)", transformOrigin: "center" }}>
        <span className="text-[8px] font-mono text-white/18 tracking-[0.45em] uppercase whitespace-nowrap">
          Explore My Universe
        </span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
        style={{ position: "absolute", inset: 0 }}
      >
        <SolarScene onNodeClick={handleClick} />
      </Canvas>
    </section>
  );
};

export default SolarSystem;
