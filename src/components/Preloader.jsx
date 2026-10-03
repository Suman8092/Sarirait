import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * Professional Sarira IT Brand Preloader
 * Minimalist, luxury agency presentation focusing strictly on the Sarira IT logo
 * with smooth ambient glow, subtle specular shine, and sleek hairline progress.
 */
export default function Preloader({ onComplete }) {
  const { isDark } = useTheme();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {

    let frameId;
    const startTime = performance.now();
    const duration = 1150; // 1.15 seconds: snappy, elegant, zero lag

    const animateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(1, elapsed / duration);
      // Silky cubic-out curve
      const eased = 1 - Math.pow(1 - rawProgress, 2.8);
      const currentVal = Math.round(eased * 100);

      setProgress(currentVal);

      if (rawProgress < 1) {
        frameId = requestAnimationFrame(animateProgress);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsDone(true);
            onComplete?.();
          }, 600);
        }, 100);
      }
    };

    frameId = requestAnimationFrame(animateProgress);

    // Bulletproof hard safety timeout (1.6s max)
    const fallbackTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsDone(true);
        onComplete?.();
      }, 400);
    }, 1600);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      clearTimeout(fallbackTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsDone(true);
      onComplete?.();
    }, 350);
  };

  if (isDone) return null;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="brand-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: {
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1]
            }
          }}
          onClick={handleDismiss}
          className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none overflow-hidden cursor-default transition-colors ${
            isDark ? 'bg-[#06080e] text-white' : 'bg-[#fafbfc] text-slate-900'
          }`}
        >
          {/* Subtle Ambient Radial Light Aura */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.9, 1.15, 1], opacity: isDark ? [0.15, 0.3, 0.2] : [0.2, 0.4, 0.25] }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className={`absolute w-[420px] h-[420px] rounded-full blur-[140px] pointer-events-none ${
              isDark ? 'bg-cyan-500/25' : 'bg-sky-400/30'
            }`}
          />

          {/* Central Logo Stage */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Logo Container with Smooth Scale & Light Gleam */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-2 overflow-hidden rounded-2xl"
            >
              <img
                src={isDark ? '/logo.png' : '/logo-light.png'}
                alt="Sarira IT"
                className="h-12 sm:h-14 w-auto object-contain filter drop-shadow-[0_0_24px_rgba(0,240,255,0.4)]"
              />

              {/* Specular Light Gleam Sweep */}
              <motion.div
                initial={{ x: '-150%' }}
                animate={{ x: '250%' }}
                transition={{ duration: 1.05, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-22deg] pointer-events-none"
              />
            </motion.div>

            {/* Minimalist Hairline Progress Bar */}
            <div className="mt-8 w-32 sm:w-40 h-[2px] rounded-full overflow-hidden relative bg-black/10 dark:bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.7)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.05 }}
              />
            </div>

            {/* Whisper Subtitle Tagline */}
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className={`text-[10px] tracking-[0.28em] uppercase font-mono-code mt-4 ${
                isDark ? 'text-slate-400/80' : 'text-slate-500'
              }`}
            >
              Innovate • Grow • Transform
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
