import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function pseudoRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function NeuralNetworkMesh({ nodeCount = 55 }) {
  const group = useRef();

  // Generate 3D nodes clustered in a spherical cloud with synaptic connections
  const { linePositions, lineColors, nodePositions, nodeColors } = useMemo(() => {
    const rawNodes = [];
    const thetaSpan = Math.PI * 2;

    for (let i = 0; i < nodeCount; i++) {
      const u = pseudoRandom(i * 1.618 + 1);
      const v = pseudoRandom(i * 2.718 + 2);
      const theta = u * thetaSpan;
      const phi = Math.acos(2 * v - 1);
      const r = 1.3 + pseudoRandom(i * 3.141 + 3) * 1.5;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      rawNodes.push(new THREE.Vector3(x, y, z));
    }

    // Connect nodes within a proximity threshold
    const lineCoords = [];
    const colorCoords = [];
    const nodeCoords = [];
    const nodeColorCoords = [];
    const cCyan = new THREE.Color("#00f0ff");
    const cViolet = new THREE.Color("#8a2be2");

    for (let i = 0; i < rawNodes.length; i++) {
      nodeCoords.push(rawNodes[i].x, rawNodes[i].y, rawNodes[i].z);
      const nc = i % 2 === 0 ? cCyan : cViolet;
      nodeColorCoords.push(nc.r, nc.g, nc.b);

      for (let j = i + 1; j < rawNodes.length; j++) {
        const dist = rawNodes[i].distanceTo(rawNodes[j]);
        if (dist < 1.45) {
          lineCoords.push(rawNodes[i].x, rawNodes[i].y, rawNodes[i].z);
          lineCoords.push(rawNodes[j].x, rawNodes[j].y, rawNodes[j].z);

          const c = pseudoRandom(i * 13 + j * 7) > 0.5 ? cCyan : cViolet;
          colorCoords.push(c.r, c.g, c.b);
          colorCoords.push(c.r * 0.7, c.g * 0.7, c.b * 0.7);
        }
      }
    }

    return {
      linePositions: new Float32Array(lineCoords),
      lineColors: new Float32Array(colorCoords),
      nodePositions: new Float32Array(nodeCoords),
      nodeColors: new Float32Array(nodeColorCoords)
    };
  }, [nodeCount]);

  useFrame((state, delta) => {
    const { pointer } = state;
    if (group.current) {
      group.current.rotation.y += delta * 0.18;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.y * 0.4,
        0.05
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        -pointer.x * 0.4,
        0.05
      );
    }
  });

  return (
    <group ref={group}>
      {/* Central Pulsing Synaptic Nucleus */}
      <mesh>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#8a2be2"
          emissiveIntensity={1.8}
          roughness={0.2}
          wireframe
        />
      </mesh>

      {/* Connected Synaptic Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Batched Synaptic Neuron Nodes - 1 Single High-Speed Draw Call */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[nodeColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function NeuralBrain3D() {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '100px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] flex items-center justify-center"
    >
      <Canvas
        frameloop={isInView ? "always" : "never"}
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.8} color="#00f0ff" />
        <pointLight position={[-5, -5, -3]} intensity={2.0} color="#8a2be2" />
        <NeuralNetworkMesh />
      </Canvas>
    </div>
  );
}
