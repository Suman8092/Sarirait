import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { DigitalCore } from './3d/DigitalCore';

export default function Hero3D() {
  const [deviceScale, setDeviceScale] = useState(() => {
    if (typeof window === 'undefined') return 1.0;
    const w = window.innerWidth;
    if (w < 640) return 0.9;
    if (w < 1024) return 0.95;
    return 1.0;
  });

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });
  const [hasWebGL] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      if (w < 640) setDeviceScale(0.9);
      else if (w < 1024) setDeviceScale(0.95);
      else setDeviceScale(1.0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] lg:h-[640px] xl:h-[680px] flex items-center justify-center">
      {/* Ambient Radial Cyber Glow Behind 3D Canvas */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.18) 0%, rgba(138, 43, 226, 0.14) 35%, rgba(7, 9, 14, 0) 72%)'
        }}
      />

      {hasWebGL ? (
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-cyan-500/20 border-t-cyan-400 animate-spin" />
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 0, isMobile ? 6.8 : 5.8], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Ambient & Directed Key/Fill Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffffff" />
            <pointLight position={[-8, -6, 4]} intensity={2.5} color="#8a2be2" />
            <pointLight position={[6, -4, 3]} intensity={2.0} color="#00f0ff" />
            <pointLight position={[0, 0, 0]} intensity={1.2} color="#00f0ff" />

            {/* The 3D Digital Transformation Core with enlarged visual scale */}
            <DigitalCore scale={deviceScale} />
          </Canvas>
        </Suspense>
      ) : (
        /* Sleek CSS Fallback */
        <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[spin_12s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-violet-500/30 animate-[spin_18s_linear_infinite_reverse]" />
          <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-cyan-500/30 via-violet-600/30 to-blue-500/30 backdrop-blur-xl border border-white/20 shadow-2xl shadow-cyan-500/20 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-cyan-400/40 blur-md animate-pulse" />
          </div>
        </div>
      )}

      {/* Floating high-tech HUD badges - contained cleanly within canvas */}
      <div className="absolute top-3 right-3 md:top-8 md:right-4 z-10 glass-pill px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono-code text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 flex items-center gap-1.5 sm:gap-2 backdrop-blur-md pointer-events-none">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>R3F ENGINE • ACTIVE</span>
      </div>

      <div className="absolute bottom-3 left-3 md:bottom-8 md:left-4 z-10 glass-pill px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono-code text-slate-300 border border-white/10 shadow-lg flex items-center gap-1.5 sm:gap-2 backdrop-blur-md pointer-events-none">
        <span className="text-violet-400">FPS:</span>
        <span className="text-white font-semibold">60 • LOW LATENCY</span>
      </div>
    </div>
  );
}
