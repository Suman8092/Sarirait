import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, ShieldCheck, Activity, Terminal } from 'lucide-react';
import { sound } from '../../utils/sound';

export function DeviceShowcase3D() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [activeMetric, setActiveMetric] = useState(0);

  // Mouse tilt position
  const tiltRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rafRef = useRef(null);
  const isLoopRunning = useRef(false);
  const isHovered = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Smooth RAF loop with automatic idle sleep
    const updateTilt = () => {
      const { x, y, targetX, targetY } = tiltRef.current;
      const dx = targetX - x;
      const dy = targetY - y;

      // When settled back to rest or hover target, stop the RAF loop completely
      if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
        tiltRef.current.x = targetX;
        tiltRef.current.y = targetY;
        if (cardRef.current) {
          cardRef.current.style.transform = `perspective(1200px) rotateX(${targetX + 2}deg) rotateY(${targetY}deg) translateZ(0)`;
        }
        isLoopRunning.current = false;
        return;
      }

      tiltRef.current.x += dx * 0.14;
      tiltRef.current.y += dy * 0.14;

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1200px) rotateX(${tiltRef.current.x + 2}deg) rotateY(${tiltRef.current.y}deg) translateZ(0)`;
      }

      rafRef.current = requestAnimationFrame(updateTilt);
    };

    const wakeTiltLoop = () => {
      if (!isLoopRunning.current) {
        isLoopRunning.current = true;
        rafRef.current = requestAnimationFrame(updateTilt);
      }
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate subtle degrees (-6 to 6 deg)
      tiltRef.current.targetY = ((x - centerX) / centerX) * 6;
      tiltRef.current.targetX = -((y - centerY) / centerY) * 5;
      isHovered.current = true;
      wakeTiltLoop();
    };

    const handleMouseLeave = () => {
      tiltRef.current.targetX = 0;
      tiltRef.current.targetY = 0;
      isHovered.current = false;
      wakeTiltLoop();
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full py-6 sm:py-10 flex items-center justify-center select-none"
      style={{ perspective: '1200px' }}
    >
      {/* 3D TILT LAPTOP CONTAINER - NO transition-transform to prevent animation collision */}
      <div
        ref={cardRef}
        className="relative w-full max-w-4xl flex flex-col items-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1200px) rotateX(2deg) rotateY(0deg)'
        }}
      >
        {/* 1. LAPTOP SCREEN (LID) */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-[#2a3447] via-[#161d2b] to-[#0d121c] border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
          {/* Top Notch / Camera Bezel */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-black/60 flex items-center justify-center gap-1.5 z-20">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b] border border-white/10" />
            <div className="w-1 h-1 rounded-full bg-cyan-500/60" />
          </div>

          {/* SCREEN DISPLAY SURFACE */}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#080d19] border border-white/10 shadow-inner flex flex-col">
            {/* Screen Header / Browser Bar */}
            <div className="px-3 sm:px-4 py-2.5 bg-[#0d1424] border-b border-white/[0.08] flex items-center justify-between gap-3">
              {/* Traffic light dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
              </div>

              {/* URL address pill */}
              <div className="flex-1 max-w-xl mx-auto px-3 py-1 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-center gap-2 text-[10px] sm:text-xs font-mono-code text-slate-400 truncate">
                <ShieldCheck size={13} className="text-cyan-400 shrink-0" />
                <span className="truncate">https://sarirait.com/concepts/digital-experience</span>
              </div>

              {/* Live badge */}
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono-code text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">CONCEPT PREVIEW</span>
              </div>
            </div>

            {/* Screen Content Body */}
            <div className="p-4 sm:p-7 space-y-5 bg-gradient-to-b from-[#080d19] via-[#070b14] to-[#05080f]">
              {/* App Title Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono-code text-cyan-300 mb-2">
                    <Activity size={12} />
                    <span>INTERFACE CONCEPT</span>
                  </div>
                  <h4 className="text-lg sm:text-2xl font-display font-bold text-white tracking-tight">
                    Digital experience <span className="text-gradient-cyan">concept</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    A sample dashboard layout for a connected digital product.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.click();
                      setActiveMetric(0);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all ${
                      activeMetric === 0
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => {
                      sound.click();
                      setActiveMetric(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all ${
                      activeMetric === 1
                        ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
                        : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
                    }`}
                  >
                    Details
                  </button>
                </div>
              </div>

              {/* Illustrative interface cards */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                {/* Summary card */}
                <div className="sm:col-span-4 p-4 rounded-xl bg-white/[0.02] border border-cyan-500/30 flex flex-col justify-between">
                  <span className="text-[10px] font-mono-code uppercase text-cyan-400 tracking-wider">
                    Project overview
                  </span>
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-white my-2">
                    At a glance
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium font-mono-code">
                    <span>Clear status and next steps</span>
                  </div>
                </div>

                {/* Activity visualization */}
                <div className="sm:col-span-8 p-4 rounded-xl bg-white/[0.02] border border-violet-500/30 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono-code uppercase text-violet-400 tracking-wider">
                      Content and activity
                    </span>
                    <span className="text-xs font-mono-code text-cyan-300 font-bold">Sample view</span>
                  </div>

                  {/* SVG Wave Graphic */}
                  <div className="w-full h-20 sm:h-24">
                    <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#8a2be2" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,70 Q40,30 80,55 T160,40 T240,65 T320,25 T400,45 L400,100 L0,100 Z"
                        fill="url(#waveGrad)"
                      />
                      <path
                        d="M0,70 Q40,30 80,55 T160,40 T240,65 T320,25 T400,45"
                        fill="none"
                        stroke="#00f0ff"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => sound.click()}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
                >
                  <span>Explore the concept</span>
                  <ArrowUpRight size={14} />
                </button>
                <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <Terminal size={13} className="text-violet-400" />
                  <span>Navigation // Content // Interaction</span>
                </div>
              </div>
            </div>

            {/* Specular Screen Gloss Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none" />
          </div>
        </div>

        {/* 2. LAPTOP LOWER CHASSIS & KEYBOARD BASE */}
        <div className="w-[104%] h-5 sm:h-7 bg-gradient-to-b from-[#222b3b] via-[#18202d] to-[#0c111a] rounded-b-2xl border-t border-white/20 border-b border-white/5 shadow-2xl relative flex items-center justify-center -mt-1 z-10">
          {/* Subtle Front Lip Notch */}
          <div className="w-20 sm:w-28 h-1 rounded-full bg-cyan-500/40 shadow-sm shadow-cyan-500/50" />
        </div>

        {/* 3. SOFT AMBIENT CYAN CONTACT GLOW */}
        <div className="w-3/4 h-10 bg-cyan-500/20 rounded-full blur-[40px] pointer-events-none -mt-4 -z-10" />
      </div>
    </div>
  );
}
