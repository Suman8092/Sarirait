import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useMotionPointer from '../hooks/useMotionPointer';

/**
 * MagneticButton
 * Creates a subtle, silky magnetic pull toward the mouse cursor.
 * Uses spring physics for realistic pull and instant graceful return on mouse exit.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.18,
  maxOffset = 6,
  onClick,
  onMouseMove,
  onMouseLeave,
  style,
  ...props
}) {
  const ref = useRef(null);
  const canAnimate = useMotionPointer();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, { stiffness: 280, damping: 25, mass: 0.2 });
  const y = useSpring(offsetY, { stiffness: 280, damping: 25, mass: 0.2 });

  useEffect(() => {
    const reset = () => {
      offsetX.set(0);
      offsetY.set(0);
    };
    reset();
    window.addEventListener('scroll', reset, { passive: true });
    window.addEventListener('blur', reset);
    return () => {
      window.removeEventListener('scroll', reset);
      window.removeEventListener('blur', reset);
    };
  }, [offsetX, offsetY, canAnimate]);

  const handleMouseMove = (e) => {
    onMouseMove?.(e);
    if (!canAnimate || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY));

    offsetX.set(clampedX);
    offsetY.set(clampedY);
  };

  const handleMouseLeave = (e) => {
    onMouseLeave?.(e);
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, x: canAnimate ? x : 0, y: canAnimate ? y : 0 }}
      className={`inline-block ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}
