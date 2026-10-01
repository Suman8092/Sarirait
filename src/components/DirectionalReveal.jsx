import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * DirectionalReveal
 * Animates elements from a specified direction with opacity, optional subtle blur,
 * and cubic-bezier easing as they enter the viewport.
 */
export default function DirectionalReveal({
  children,
  direction = 'up', // 'left' | 'right' | 'up' | 'scale'
  distance = 28,
  delay = 0,
  duration = 0.7,
  blur = false,
  className = '',
  once = true,
  amount = 0.18
}) {
  const reducedMotion = useReducedMotion();
  const getInitial = () => {
    switch (direction) {
      case 'left':
        return { 
          opacity: 0, 
          x: -distance, 
          filter: blur ? 'blur(6px)' : 'none' 
        };
      case 'right':
        return { 
          opacity: 0, 
          x: distance, 
          filter: blur ? 'blur(6px)' : 'none' 
        };
      case 'scale':
        return { 
          opacity: 0, 
          scale: 0.98,
          filter: blur ? 'blur(6px)' : 'none' 
        };
      case 'up':
      default:
        return { 
          opacity: 0, 
          y: distance, 
          filter: blur ? 'blur(4px)' : 'none' 
        };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case 'left':
      case 'right':
        return { opacity: 1, x: 0, filter: 'blur(0px)' };
      case 'scale':
        return { opacity: 1, scale: 1, filter: 'blur(0px)' };
      case 'up':
      default:
        return { opacity: 1, y: 0, filter: 'blur(0px)' };
    }
  };

  return (
    <motion.div
      initial={reducedMotion ? false : getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, amount }}
      transition={{
        duration: reducedMotion ? 0 : duration,
        delay: reducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
