import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useInView, useReducedMotion } from 'framer-motion';
import usePageVisibility from '../../hooks/usePageVisibility';

function MiniCore({ animate = true }) {
  const meshRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const elapsedRef = useRef(0);

  useFrame((_, delta) => {
    if (!animate) return;
    const step = Math.min(delta, 0.04);
    elapsedRef.current += step;
    if (meshRef.current) {
      meshRef.current.rotation.y += step * 0.4;
      meshRef.current.rotation.x += step * 0.2;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z += step * 0.6;
      ringRef1.current.rotation.x = Math.sin(elapsedRef.current * 0.8) * 0.3 + 0.4;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y -= step * 0.5;
      ringRef2.current.rotation.z -= step * 0.3;
    }
  });

  return (
    <group scale={[0.85, 0.85, 0.85]}>
      {/* Central glowing core */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      {/* Inner Sphere */}
      <mesh>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshPhysicalMaterial
          color="#8a2be2"
          emissive="#8a2be2"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Ring 1 */}
      <group ref={ringRef1} rotation={[0.4, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.4, 0.015, 12, 64]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Orbiting Ring 2 */}
      <group ref={ringRef2} rotation={[0.8, 0.4, 0]}>
        <mesh>
          <torusGeometry args={[1.65, 0.012, 12, 64]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

export default function MegaMenu3D() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.05 });
  const pageVisible = usePageVisibility();
  const animate = isInView && pageVisible;

  return (
    <div ref={containerRef} className="w-full h-36 relative flex items-center justify-center pointer-events-none">
      <Canvas
        frameloop={animate ? 'always' : 'demand'}
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={2.5} color="#00f0ff" />
        <pointLight position={[-3, -3, -2]} intensity={2.0} color="#8a2be2" />
        <MiniCore animate={animate} />
      </Canvas>
    </div>
  );
}
