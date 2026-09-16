import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera, Sparkles } from "@react-three/drei";
import * as THREE from "three";

export const Scene = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    // Extremely subtle camera breathing — no zoom, no scroll link
    if (cameraRef.current) {
      const t = state.clock.getElapsedTime();
      cameraRef.current.position.y = Math.sin(t * 0.08) * 0.15;
      cameraRef.current.rotation.x = Math.sin(t * 0.06) * 0.008;
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 12]} fov={60} />

      {/* Minimal ambient lighting */}
      <Stars radius={120} depth={60} count={3000} factor={3} saturation={0} fade speed={0.3} />

      {/* Minimal ambient lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#f5f0e8" />

      {/* Subtle warm point light from below-right */}
      <pointLight position={[8, -4, 2]} intensity={3} distance={25} color="#d4a574" />

      {/* Ambient floating particles instead of rings */}
      <Sparkles count={200} scale={20} size={1.5} speed={0.2} opacity={0.3} color="#d4a574" />
      <Sparkles count={150} scale={25} size={2.5} speed={0.15} opacity={0.25} color="#4a9ead" />

      {/* Distant geometric shapes — very far back, barely visible */}
      <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.5} position={[-10, 5, -30]}>
        <mesh>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#1a2332" metalness={0.9} roughness={0.3} wireframe transparent opacity={0.3} />
        </mesh>
      </Float>

      <Float speed={0.4} rotationIntensity={0.2} floatIntensity={0.4} position={[12, -5, -35]}>
        <mesh>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#1a2332" metalness={0.9} roughness={0.3} wireframe transparent opacity={0.25} />
        </mesh>
      </Float>
    </>
  );
};
