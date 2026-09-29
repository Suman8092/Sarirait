import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * TiltCard
 * Inspired by Lusion, Chipsa 3D & Utsubo:
 * 3D perspective tilt with specular holographic light sheen
 * and precision Japanese minimalist corner crosshairs (+) that spin on hover.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 8, // max degrees
  glare = true,
  crosshairs = true,
  as: Component = 'div',
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const { isDark } = useTheme();

  // Spring physics for smooth tilt and return
  const springConfig = { damping: 20, stiffness: 200, mass: 0.1 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalized from -0.5 to +0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    // Tilt calculations (Y mouse controls rotateX, X mouse controls rotateY)
    rotateX.set(-yPct * maxTilt);
    rotateY.set(xPct * maxTilt);

    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.02);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative w-full h-full"
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative ${className}`}
        {...props}
      >
        {/* Specular Holographic Glare Sheen (Lusion signature) */}
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
            style={{
              opacity: isHovered ? (isDark ? 0.25 : 0.15) : 0,
              background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.6) 0%, rgba(0, 240, 255, 0.3) 30%, transparent 70%)`,
              mixBlendMode: isDark ? 'screen' : 'overlay',
            }}
          />
        )}

        {/* Utsubo Precision Geometric Crosshair Accents (+) at 4 corners */}
        {crosshairs && (
          <>
            <span
              className={`pointer-events-none absolute -top-1.5 -left-1.5 text-[10px] font-mono-code transition-transform duration-300 select-none z-20 ${
                isDark ? 'text-cyan-400/60' : 'text-cyan-700/60'
              } ${isHovered ? 'rotate-45 scale-125 !text-cyan-400' : ''}`}
            >
              +
            </span>
            <span
              className={`pointer-events-none absolute -top-1.5 -right-1.5 text-[10px] font-mono-code transition-transform duration-300 select-none z-20 ${
                isDark ? 'text-cyan-400/60' : 'text-cyan-700/60'
              } ${isHovered ? 'rotate-45 scale-125 !text-cyan-400' : ''}`}
            >
              +
            </span>
            <span
              className={`pointer-events-none absolute -bottom-1.5 -left-1.5 text-[10px] font-mono-code transition-transform duration-300 select-none z-20 ${
                isDark ? 'text-cyan-400/60' : 'text-cyan-700/60'
              } ${isHovered ? 'rotate-45 scale-125 !text-cyan-400' : ''}`}
            >
              +
            </span>
            <span
              className={`pointer-events-none absolute -bottom-1.5 -right-1.5 text-[10px] font-mono-code transition-transform duration-300 select-none z-20 ${
                isDark ? 'text-cyan-400/60' : 'text-cyan-700/60'
              } ${isHovered ? 'rotate-45 scale-125 !text-cyan-400' : ''}`}
            >
              +
            </span>
          </>
        )}

        {/* Card Content with 3D depth translation */}
        <div style={{ transform: 'translateZ(18px)' }} className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
