import React, { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useLenis } from '../SmoothScroll';

/**
 * ScrollSkew
 * Inspired by Studio Freight & Locomotive:
 * Tactile physics-based skew that reacts to scroll velocity,
 * giving elements weight and momentum as you scroll through the page.
 */
export default function ScrollSkew({
  children,
  className = '',
  maxSkew = 1.2, // maximum skew angle in degrees
  factor = 0.05, // sensitivity factor
  ...props
}) {
  const lenis = useLenis();
  const skewY = useSpring(0, { damping: 25, stiffness: 180, mass: 0.1 });
  const isReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  useEffect(() => {
    if (!lenis || isReducedMotion.current) return;

    const onScroll = ({ velocity }) => {
      // Calculate clamped skew angle based on scroll velocity
      const targetSkew = Math.max(Math.min(velocity * factor, maxSkew), -maxSkew);
      skewY.set(targetSkew);
    };

    lenis.on('scroll', onScroll);

    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [lenis, maxSkew, factor, skewY]);

  return (
    <motion.div
      style={{ skewY, transformOrigin: 'center center' }}
      className={`will-change-transform ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
