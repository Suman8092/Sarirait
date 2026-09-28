import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { DigitalCore } from './3d/DigitalCore';

export default function Hero3D() {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

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

  // Track visibility to pause 3D render loop when user scrolls down
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

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      if (w < 640) setDeviceScale(0.9);
      else if (w < 1024) setDeviceScale(0.95);
      else setDeviceScale(1.0);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-full h-[340px] sm:h-[460px] md:h-[540px] lg:h-[620px] xl:h-[680px] flex items-center justify-center overflow-hidden"
    >
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
              <div className="w-40 h-40 rounded-full border border-cyan-500/20 border-t-cyan-400 animate-spin" />
            </div>
          }
        >
          <Canvas
            frameloop={isInView ? "always" : "never"}
            camera={{ position: [0, 0, isMobile ? 6.8 : 5.8], fov: 45 }}
            dpr={isMobile ? 1 : [1, 1.5]}
            gl={{ 
              antialias: !isMobile, 
              alpha: true,
              powerPreference: "high-performance",
              stencil: false,
              depth: true
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Ambient & Directed Key/Fill Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffffff" />
            <pointLight position={[-8, -6, 4]} intensity={2.0} color="#8a2be2" />
            <pointLight position={[6, -4, 3]} intensity={1.8} color="#00f0ff" />
            <pointLight position={[0, 0, 0]} intensity={1.0} color="#00f0ff" />

            {/* The 3D Digital Transformation Core with enlarged visual scale */}
            <DigitalCore scale={deviceScale} />
          </Canvas>
        </Suspense>
      ) : (
        /* Sleek CSS Fallback */
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] max-w-full flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[spin_12s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-violet-500/30 animate-[spin_18s_linear_infinite_reverse]" />
          <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-cyan-500/30 via-violet-600/30 to-blue-500/30 backdrop-blur-xl border border-white/20 shadow-2xl shadow-cyan-500/20 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-cyan-400/40 blur-md animate-pulse" />
          </div>
        </div>
      )}

      {/* Floating high-tech HUD badges - contained cleanly within canvas */}
      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 md:top-8 md:right-4 z-10 glass-pill px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono-code text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 flex items-center gap-1.5 sm:gap-2 backdrop-blur-md pointer-events-none max-w-[48%] truncate">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
        <span className="truncate">R3F ENGINE • ACTIVE</span>
      </div>

      <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 md:bottom-8 md:left-4 z-10 glass-pill px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono-code text-slate-300 border border-white/10 shadow-lg flex items-center gap-1.5 sm:gap-2 backdrop-blur-md pointer-events-none max-w-[48%] truncate">
        <span className="text-violet-400 shrink-0">FPS:</span>
        <span className="text-white font-semibold truncate">60 • LOW LATENCY</span>
      </div>
    </div>
  );
}
