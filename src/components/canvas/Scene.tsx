import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Mouse parallax tracker
const MouseParallaxCamera = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame((state) => {
    if (!cameraRef.current) return;
    const t = state.clock.getElapsedTime();
    // Smooth mouse interpolation
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.03;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.03;

    // Breathing + mouse parallax
    cameraRef.current.position.x = smoothMouse.current.x * 0.8;
    cameraRef.current.position.y = smoothMouse.current.y * -0.5 + Math.sin(t * 0.08) * 0.15;
    cameraRef.current.rotation.x = Math.sin(t * 0.06) * 0.006 + smoothMouse.current.y * -0.01;
    cameraRef.current.rotation.y = smoothMouse.current.x * 0.01;
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 12]} fov={60} />;
};

// DNA Helix geometry
const DNAHelix = () => {
  const group = useRef<THREE.Group>(null);
  const strandCount = 60;
  const radius = 1.2;
  const height = 20;

  const strand1Points: THREE.Vector3[] = [];
  const strand2Points: THREE.Vector3[] = [];
  const rungs: Array<[THREE.Vector3, THREE.Vector3]> = [];

  for (let i = 0; i < strandCount; i++) {
    const t = (i / strandCount) * Math.PI * 8;
    const y = (i / strandCount) * height - height / 2;
    const x1 = Math.cos(t) * radius;
    const z1 = Math.sin(t) * radius;
    const x2 = Math.cos(t + Math.PI) * radius;
    const z2 = Math.sin(t + Math.PI) * radius;

    strand1Points.push(new THREE.Vector3(x1, y, z1));
    strand2Points.push(new THREE.Vector3(x2, y, z2));

    if (i % 8 === 0) {
      rungs.push([
        new THREE.Vector3(x1, y, z1),
        new THREE.Vector3(x2, y, z2),
      ]);
    }
  }

  const curve1 = new THREE.CatmullRomCurve3(strand1Points);
  const curve2 = new THREE.CatmullRomCurve3(strand2Points);
  const tubeGeo1 = new THREE.TubeGeometry(curve1, 200, 0.018, 6, false);
  const tubeGeo2 = new THREE.TubeGeometry(curve2, 200, 0.018, 6, false);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.06;
    }
  });

  return (
    <group ref={group} position={[-14, 0, -20]}>
      <mesh geometry={tubeGeo1}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.4} transparent opacity={0.25} />
      </mesh>
      <mesh geometry={tubeGeo2}>
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.4} transparent opacity={0.25} />
      </mesh>
      {rungs.map(([a, b], i) => {
        const rungPoints = [a, b];
        const geo = new THREE.BufferGeometry().setFromPoints(rungPoints);
        return (
          <line key={i} geometry={geo}>
            <lineBasicMaterial color="#22d3ee" transparent opacity={0.2} />
          </line>
        );
      })}
    </group>
  );
};

// Floating geometric shapes
const FloatingGeometry = () => {
  const shapes = [
    { pos: [-10, 5, -30] as [number,number,number], type: "icosahedron", color: "#1a2332", speed: 0.5, emissive: "#f59e0b" },
    { pos: [12, -5, -35] as [number,number,number], type: "octahedron", color: "#1a2332", speed: 0.4, emissive: "#6366f1" },
    { pos: [8, 8, -28] as [number,number,number], type: "tetrahedron", color: "#1a2332", speed: 0.35, emissive: "#22d3ee" },
    { pos: [-15, -7, -32] as [number,number,number], type: "icosahedron", color: "#1a2332", speed: 0.45, emissive: "#10b981" },
    { pos: [20, 2, -40] as [number,number,number], type: "octahedron", color: "#1a2332", speed: 0.3, emissive: "#f97316" },
  ];

  return (
    <>
      {shapes.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={0.4} floatIntensity={0.6} position={s.pos}>
          <mesh>
            {s.type === "icosahedron" && <icosahedronGeometry args={[1.5, 0]} />}
            {s.type === "octahedron" && <octahedronGeometry args={[1.2, 0]} />}
            {s.type === "tetrahedron" && <tetrahedronGeometry args={[1.0, 0]} />}
            <meshStandardMaterial
              color={s.color}
              emissive={s.emissive}
              emissiveIntensity={0.15}
              metalness={0.9}
              roughness={0.3}
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

export const Scene = () => {
  return (
    <>
      <MouseParallaxCamera />

      {/* Stars */}
      <Stars radius={140} depth={70} count={5000} factor={3.5} saturation={0} fade speed={0.25} />

      {/* Layered ambient lighting */}
      <ambientLight intensity={0.12} />
      <directionalLight position={[5, 5, 5]} intensity={0.35} color="#f5f0e8" />
      <pointLight position={[8, -4, 2]} intensity={4} distance={30} color="#d4a574" />
      <pointLight position={[-10, 6, -5]} intensity={2} distance={25} color="#6366f1" />
      <pointLight position={[0, -8, 0]} intensity={1.5} distance={20} color="#22d3ee" />

      {/* Layered sparkles — amber, blue, purple */}
      <Sparkles count={300} scale={24} size={1.2} speed={0.18} opacity={0.35} color="#d4a574" />
      <Sparkles count={200} scale={28} size={2.0} speed={0.12} opacity={0.22} color="#6366f1" />
      <Sparkles count={150} scale={32} size={2.8} speed={0.1} opacity={0.18} color="#22d3ee" />
      <Sparkles count={100} scale={20} size={1.5} speed={0.25} opacity={0.2} color="#10b981" />

      {/* DNA Helix background element */}
      <DNAHelix />

      {/* Floating geometric shapes */}
      <FloatingGeometry />

      {/* Second DNA on right side */}
      <group position={[16, 0, -25]} rotation={[0, Math.PI, 0]}>
        <DNAHelix />
      </group>
    </>
  );
};
