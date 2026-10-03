import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

/**
 * FlipCard
 * Premium 3D flip card component with realistic perspective,
 * front and back faces, sound feedback, and both hover and tap support.
 */
export default function FlipCard({
  front,
  back,
  className = '',
  minHeight = '320px',
  flipTrigger = 'both', // 'hover', 'click', 'both'
  accentGlow = 'rgba(0, 240, 255, 0.4)'
}) {
  const { isDark } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggle = () => {
    sound.click();
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="3D Interactive Flip Card. Press Enter to flip."
      aria-pressed={isFlipped}
      onKeyDown={handleKeyDown}
      onClick={flipTrigger !== 'hover' ? handleToggle : undefined}
      onMouseEnter={() => {
        if (flipTrigger === 'hover' || flipTrigger === 'both') {
          sound.hover();
          setIsFlipped(true);
        }
      }}
      onMouseLeave={() => {
        if (flipTrigger === 'hover' || flipTrigger === 'both') {
          setIsFlipped(false);
        }
      }}
      className={`group relative select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-cyan-400 rounded-3xl ${className}`}
      style={{
        perspective: '1200px',
        minHeight
      }}
    >
      <motion.div
        className="relative w-full h-full rounded-3xl"
        style={{
          transformStyle: 'preserve-3d',
          minHeight
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0
        }}
        transition={{
          duration: 0.65,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        {/* FRONT FACE */}
        <div
          className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col justify-between p-6 sm:p-7 border shadow-xl transition-all duration-300 ${
            isDark
              ? 'bg-[#0c1220]/95 border-white/[0.08] group-hover:border-cyan-400/40 shadow-black/40'
              : 'bg-white border-slate-200 shadow-slate-200/80 group-hover:border-sky-400 shadow-lg'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {front}

          {/* Interactive Flip Hint in Corner */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between mt-auto">
            <span className={`text-[10px] font-mono-code uppercase font-semibold flex items-center gap-1.5 ${
              isDark ? 'text-slate-400 group-hover:text-cyan-300' : 'text-slate-500 group-hover:text-sky-600'
            }`}>
              <RotateCcw size={11} className="transition-transform group-hover:rotate-180 duration-500" />
              <span>Hover / Tap to flip</span>
            </span>
            <span className={`text-[9px] font-mono-code px-1.5 py-0.5 rounded border ${
              isDark ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10' : 'border-sky-200 text-sky-700 bg-sky-50'
            }`}>
              3D FLIP
            </span>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden flex flex-col justify-between p-6 sm:p-7 border shadow-2xl transition-all duration-300 ${
            isDark
              ? 'bg-gradient-to-br from-[#0e1628] via-[#0b101c] to-[#070b14] border-cyan-400/50 shadow-cyan-950/40 text-white'
              : 'bg-gradient-to-br from-sky-50 via-white to-slate-50 border-sky-400 shadow-sky-500/15 text-slate-900'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {back}

          {/* Return Hint in Corner */}
          <div className="pt-3 border-t border-cyan-500/20 flex items-center justify-between mt-auto">
            <span className={`text-[10px] font-mono-code uppercase font-semibold flex items-center gap-1.5 ${
              isDark ? 'text-cyan-300' : 'text-sky-700'
            }`}>
              <RotateCcw size={11} />
              <span>Tap / Click to return</span>
            </span>
            <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded border border-cyan-400/40 text-cyan-300 bg-cyan-500/15">
              ACTIVE
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
