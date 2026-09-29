import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * MagneticButton
 * Inspired by Locomotive & 14islands:
 * Physical magnetic cursor attraction. The button smoothly glides toward the
 * cursor within its proximity, with inner text parallax and spring elasticity.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.35, // Distance pull factor (0 - 1)
  textStrength = 0.18, // Inner text parallax factor
  onClick,
  onMouseEnter,
  onMouseLeave,
  as: Component = 'button',
  ...props
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spring physics configuration (soft, elastic feel)
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const textX = useSpring(0, springConfig);
  const textY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
    textX.set(distanceX * textStrength);
    textY.set(distanceY * textStrength);
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    textX.set(0);
    textY.set(0);
    onMouseLeave?.(e);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block relative z-10"
      data-cursor={props['data-cursor'] || 'hover'}
    >
      <Component
        onClick={onClick}
        className={`${className} cursor-pointer select-none transition-shadow`}
        {...props}
      >
        <motion.span
          style={{ x: textX, y: textY }}
          className="inline-flex items-center gap-2 pointer-events-none"
        >
          {children}
        </motion.span>
      </Component>
    </motion.div>
  );
}
