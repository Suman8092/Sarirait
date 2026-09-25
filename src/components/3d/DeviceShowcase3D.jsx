import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Ultra-sleek Flagship Device Showcase with crystal-clear screen display
function LaptopMesh() {
  const group = useRef();

  // Create high-res canvas texture for the showcase screen
  const screenTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Deep high-tech background
    const bgGrad = ctx.createLinearGradient(0, 0, 1280, 800);
    bgGrad.addColorStop(0, '#0a0f1d');
    bgGrad.addColorStop(1, '#070a14');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1280, 800);

    // Subtle Cyber Grid
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1280; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 800);
      ctx.stroke();
    }
    for (let y = 0; y < 800; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1280, y);
      ctx.stroke();
    }

    // Top Window Header Bar
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(0, 0, 1280, 60);

    // Traffic light browser dots
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(36, 30, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(60, 30, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(84, 30, 7, 0, Math.PI * 2);
    ctx.fill();

    // URL address pill
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.roundRect(130, 14, 1000, 32, 8);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.stroke();
    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px "JetBrains Mono", monospace';
    ctx.fillText('🔒 https://sarirait.com/case-study/aetheria-enterprise-mesh', 150, 35);

    // Main App Title Banner
    const titleGrad = ctx.createLinearGradient(70, 130, 700, 130);
    titleGrad.addColorStop(0, '#ffffff');
    titleGrad.addColorStop(0.5, '#00f0ff');
    titleGrad.addColorStop(1, '#a855f7');
    ctx.fillStyle = titleGrad;
    ctx.font = '800 38px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('AETHERIA NEURAL MESH v3.4', 70, 135);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Autonomous AI orchestration platform for Fortune 500 digital infrastructure.', 70, 175);

    // Card 1: Metric KPI Box
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.roundRect(70, 220, 340, 240, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#00f0ff';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText('PIPELINE INFERENCE LATENCY', 100, 265);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 52px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('< 24ms', 100, 340);

    ctx.fillStyle = '#10b981';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('▲ 99.999% Verified SLA Uptime', 100, 395);

    // Card 2: Real-time Telemetry Graph Box
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
    ctx.roundRect(440, 220, 770, 240, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#c084fc';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText('REAL-TIME DISTRIBUTED THROUGHPUT (REQ/SEC)', 470, 265);

    // Wave Telemetry Curve
    ctx.beginPath();
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3.5;
    const wavePoints = [370, 350, 390, 330, 360, 320, 340, 310, 330, 300, 320];
    wavePoints.forEach((val, idx) => {
      const px = 470 + idx * 70;
      if (idx === 0) ctx.moveTo(px, val);
      else ctx.lineTo(px, val);
    });
    ctx.stroke();

    // Fill under curve
    ctx.lineTo(470 + (wavePoints.length - 1) * 70, 430);
    ctx.lineTo(470, 430);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.fill();

    // Interactive Action Pills
    ctx.fillStyle = 'linear-gradient(to right, #00f0ff, #3b82f6)';
    ctx.roundRect(70, 500, 240, 56, 12);
    ctx.fillStyle = 'rgba(0, 240, 255, 0.25)';
    ctx.fill();
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('LAUNCH PIPELINE →', 105, 535);

    // Secondary pill
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.roundRect(330, 500, 220, 56, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.stroke();
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('INSPECT TELEMETRY', 360, 535);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    return texture;
  }, []);

  useFrame((state) => {
    const { pointer } = state;
    if (group.current) {
      const time = state.clock.getElapsedTime();
      // Gentle, controlled interactive tilt that stays upright and never flips forward
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        Math.sin(time * 0.3) * 0.1 + pointer.x * 0.2,
        0.05
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        0.06 - pointer.y * 0.08,
        0.05
      );
      group.current.position.y = Math.sin(time * 0.8) * 0.05;
    }
  });

  return (
    <group ref={group} position={[0, -0.3, 0]} scale={[1.05, 1.05, 1.05]}>
      {/* 1. SCREEN DISPLAY - UPRIGHT & FULLY VISIBLE */}
      <group position={[0, 0.75, -0.2]}>
        {/* Back Housing Shell */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[4.6, 2.95, 0.06]} />
          <meshPhysicalMaterial
            color="#2a3346"
            metalness={0.9}
            roughness={0.2}
            clearcoat={0.6}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Display Bezel Border */}
        <mesh position={[0, 0, 0.005]}>
          <boxGeometry args={[4.5, 2.85, 0.02]} />
          <meshPhysicalMaterial
            color="#141923"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>

        {/* Screen Content Plane */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[4.35, 2.7]} />
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        </mesh>

        {/* Screen Glass Reflection */}
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[4.35, 2.7]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.08}
            roughness={0.05}
            metalness={0.1}
            transmission={0.9}
            ior={1.4}
          />
        </mesh>

        {/* Top Camera Notch */}
        <mesh position={[0, 1.36, 0.022]}>
          <circleGeometry args={[0.035, 16]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Soft Ambient Cyan Backlight Glow */}
        <pointLight position={[0, 0, 0.8]} intensity={1.5} color="#00f0ff" distance={3.5} />
      </group>

      {/* 2. LAPTOP BASE - SLENDER METALLIC CHASSIS (Angled away so it never blocks the screen) */}
      <group position={[0, -0.72, 0.55]} rotation={[0.08, 0, 0]}>
        {/* Main Aluminum Base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4.6, 0.08, 1.6]} />
          <meshPhysicalMaterial
            color="#222b3a"
            metalness={0.92}
            roughness={0.25}
            clearcoat={0.5}
            clearcoatRoughness={0.15}
          />
        </mesh>

        {/* Keyboard Deck Recess */}
        <mesh position={[0, 0.042, -0.22]}>
          <boxGeometry args={[4.1, 0.01, 0.9]} />
          <meshStandardMaterial
            color="#131822"
            roughness={0.6}
            metalness={0.8}
          />
        </mesh>

        {/* Subtle Backlit Keyboard Glow Strip */}
        <mesh position={[0, 0.045, -0.22]}>
          <boxGeometry args={[4.05, 0.005, 0.85]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.18}
          />
        </mesh>

        {/* Precision Glass Trackpad */}
        <mesh position={[0, 0.043, 0.42]}>
          <boxGeometry args={[1.5, 0.008, 0.55]} />
          <meshPhysicalMaterial
            color="#1e2636"
            metalness={0.85}
            roughness={0.2}
            clearcoat={0.6}
          />
        </mesh>
      </group>

      {/* 3. SOFT AMBIENT CONTACT GLOW (No harsh black disc!) */}
      <mesh position={[0, -0.9, 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 2.8, 32]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

export function DeviceShowcase3D() {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0.6, 4.6], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 8, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-6, -3, 3]} intensity={1.5} color="#8a2be2" />
        <pointLight position={[0, 2, 3]} intensity={2.2} color="#00f0ff" />
        <pointLight position={[0, -2, 2]} intensity={1.0} color="#3b82f6" />
        <LaptopMesh />
      </Canvas>
    </div>
  );
}

