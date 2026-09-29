import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { sound } from '../../utils/sound';
import TextScramble from './TextScramble';

/**
 * CyberHUD
 * Inspired by Why Zero University & Fantik Studio:
 * Real-time cybernetic studio telemetry widget featuring live IST clock,
 * studio GPS coordinates, client availability ping, and interactive audio triggers.
 */
export default function CyberHUD({ className = '' }) {
  const { isDark } = useTheme();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onMouseEnter={() => sound.hover()}
      className={`w-full py-2.5 px-4 sm:px-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono-code ${
        isDark
          ? 'bg-black/60 border-cyan-500/25 text-slate-300 shadow-lg shadow-cyan-500/5'
          : 'bg-white/80 border-slate-200 text-slate-700 shadow-md shadow-slate-200/50'
      } ${className}`}
    >
      {/* 1. Live Studio Availability Ping */}
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="tracking-wider uppercase font-semibold text-emerald-400">
          STUDIO STATUS:
        </span>
        <span className={isDark ? 'text-slate-300' : 'text-slate-800'}>
          ACCEPTING SELECT CLIENTS
        </span>
      </div>

      {/* 2. Studio GPS Coordinates (Active Theory style) */}
      <div className="hidden md:flex items-center gap-2">
        <span className={isDark ? 'text-cyan-400' : 'text-cyan-700'}>LOC:</span>
        <TextScramble
          text="28.5355° N, 77.3910° E // NOIDA"
          triggerOnHover={true}
          className="tracking-wider"
        />
      </div>

      {/* 3. Live IST Clock & Latency Ping */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className={isDark ? 'text-violet-400' : 'text-violet-700'}>IST:</span>
          <span className="font-bold tracking-widest text-cyan-400 min-w-[65px]">
            {timeStr || '17:35:00'}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 border-l pl-3 border-white/10">
          <span className="text-slate-400">PING:</span>
          <span className="text-emerald-400 font-semibold">18MS</span>
        </div>
      </div>
    </div>
  );
}
