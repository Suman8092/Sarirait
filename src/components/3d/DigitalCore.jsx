import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function pseudoRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Orbiting Ring Component
function OrbitRing({ radius, width, speed, tilt, color = "#00f0ff" }) {
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * speed;
      ringRef.current.rotation.x = tilt + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={ringRef} rotation={[tilt, 0, 0]}>
      <mesh>
        <torusGeometry args={[radius, width, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
          wireframe={false}
          transparent
          opacity={0.75}
        />
      </mesh>
    </group>
  );
}

// Digital Nodes Orbiting the Core
function OrbitingNodes({ count = 8, radius = 2.4, speed = 0.4 }) {
  const groupRef = useRef();
  
  const nodes = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle * 2) * 0.4,
        z: Math.sin(angle) * radius,
        scale: 0.08 + pseudoRandom(i * 5.23 + 1) * 0.06,
        color: i % 2 === 0 ? "#00f0ff" : "#8a2be2"
      };
    });
  }, [count, radius]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, node.z]}>
          <octahedronGeometry args={[node.scale, 0]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// Surrounding Interactive Particle Dust
function ParticleDust({ count = 350 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color("#00f0ff");
    const c2 = new THREE.Color("#8a2be2");
    const c3 = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      // spherical distribution around core
      const theta = pseudoRandom(i * 1.618 + 1) * Math.PI * 2;
      const phi = Math.acos(pseudoRandom(i * 2.718 + 2) * 2 - 1);
      const r = 2.0 + pseudoRandom(i * 3.141 + 3) * 3.5;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const randColor = pseudoRandom(i * 4.414 + 4);
      const chosen = randColor > 0.6 ? c1 : randColor > 0.3 ? c2 : c3;
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x -= delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Geometric Floating Shards
function FloatingShards() {
  const shardsRef = useRef();
  
  useFrame((state, delta) => {
    if (shardsRef.current) {
      shardsRef.current.rotation.y += delta * 0.1;
      shardsRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={shardsRef}>
      <mesh position={[2.2, 1.4, -1]} rotation={[0.4, 0.8, 0]}>
        <tetrahedronGeometry args={[0.25, 0]} />
        <meshPhysicalMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>
      <mesh position={[-2.4, -1.2, 0.8]} rotation={[0.9, 0.2, 0.5]}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshPhysicalMaterial
          color="#8a2be2"
          emissive="#8a2be2"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[1.8, -1.8, 1.2]} rotation={[0.2, 0.5, 0.9]}>
        <dodecahedronGeometry args={[0.22, 0]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          roughness={0.3}
          metalness={0.7}
          wireframe
        />
      </mesh>
    </group>
  );
}

// Main Central Core
export function DigitalCore({ scale = 1.25 }) {
  const coreRef = useRef();
  const innerRef = useRef();
  const wireRef = useRef();

  useFrame((state, delta) => {
    const { pointer } = state;

    // Smooth subtle camera/mouse tracking parallax
    if (coreRef.current) {
      // Rotation lerping
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x = THREE.MathUtils.lerp(
        coreRef.current.rotation.x,
        pointer.y * 0.35,
        0.05
      );
      coreRef.current.rotation.z = THREE.MathUtils.lerp(
        coreRef.current.rotation.z,
        -pointer.x * 0.35,
        0.05
      );
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.4;
      innerRef.current.rotation.x += delta * 0.2;
    }

    if (wireRef.current) {
      wireRef.current.rotation.y += delta * 0.15;
      wireRef.current.rotation.z -= delta * 0.1;
      const pulse = 1.35 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.03;
      wireRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={coreRef} scale={[scale, scale, scale]}>
      {/* Outer Geometric Wireframe Cage */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.35}
          emissive="#00f0ff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Primary Luminous Holographic Crystal Core (Translucent & Refractive) */}
      <mesh>
        <sphereGeometry args={[0.82, 64, 64]} />
        <meshPhysicalMaterial
          color="#00f0ff"
          emissive="#0284c7"
          emissiveIntensity={0.25}
          roughness={0.1}
          metalness={0.1}
          transmission={0.85}
          thickness={1.2}
          transparent={true}
          opacity={0.7}
          ior={1.5}
          reflectivity={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Internal Pulsing Quantum Heart (Visible through the translucent crystal) */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#c084fc"
          emissiveIntensity={1.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Inner Glowing Geometric Lattice */}
      <mesh>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Core Inner Glow Lights */}
      <pointLight color="#00f0ff" intensity={2.0} distance={3.5} />
      <pointLight color="#a855f7" intensity={2.0} distance={3.0} />

      {/* Orbital Rings at various angles - Scaled to fit completely inside viewport */}
      <OrbitRing radius={1.35} width={0.014} speed={0.4} tilt={0.45} color="#00f0ff" />
      <OrbitRing radius={1.62} width={0.012} speed={-0.3} tilt={-0.6} color="#a855f7" />
      <OrbitRing radius={1.88} width={0.010} speed={0.2} tilt={1.1} color="#6366f1" />

      {/* Orbiting Digital Nodes */}
      <OrbitingNodes count={8} radius={1.5} speed={0.35} />

      {/* Surrounding Ambient Particle Dust */}
      <ParticleDust count={240} />

      {/* Floating Shards */}
      <FloatingShards />
    </group>
  );
}
