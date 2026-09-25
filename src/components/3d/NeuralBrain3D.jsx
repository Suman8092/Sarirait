import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function pseudoRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function NeuralNetworkMesh({ nodeCount = 55 }) {
  const group = useRef();

  // Generate 3D nodes clustered in a spherical cloud with synaptic connections
  const { nodes, linePositions, lineColors } = useMemo(() => {
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
    const cCyan = new THREE.Color("#00f0ff");
    const cViolet = new THREE.Color("#8a2be2");

    for (let i = 0; i < rawNodes.length; i++) {
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
      nodes: rawNodes,
      linePositions: new Float32Array(lineCoords),
      lineColors: new Float32Array(colorCoords)
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
        <sphereGeometry args={[0.55, 32, 32]} />
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

      {/* Nodes (Neurons) */}
      {nodes.map((pos, idx) => (
        <mesh key={idx} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[idx % 3 === 0 ? 0.05 : 0.035, 12, 12]} />
          <meshBasicMaterial
            color={idx % 2 === 0 ? "#00f0ff" : "#c084fc"}
          />
        </mesh>
      ))}
    </group>
  );
}

export function NeuralBrain3D() {
  return (
    <div className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={2.0} color="#00f0ff" />
        <pointLight position={[-5, -5, -3]} intensity={2.5} color="#8a2be2" />
        <NeuralNetworkMesh />
      </Canvas>
    </div>
  );
}
