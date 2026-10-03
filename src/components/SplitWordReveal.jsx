import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * SplitWordReveal
 * Brainly-style 3D Flip Tumble & Kinetic Blur Word Reveal.
 * Words roll up sequentially with 3D perspective, transitioning from
 * dreamy cinematic blur to sharp precision.
 */
export default function SplitWordReveal({
  text = '',
  className = '',
  as: Component = 'span',
  delay = 0,
  stagger = 0.05,
  duration = 0.72,
  once = true
}) {
  const reducedMotion = useReducedMotion();
  const words = text.split(' ').filter(Boolean);

  return (
    <Component className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`} aria-label={text}>
      {words.map((word, idx) => (
        <span 
          key={idx} 
          className="inline-block py-0.5 [perspective:1200px] [transform-style:preserve-3d]" 
          aria-hidden="true"
        >
          <motion.span
            className="inline-block will-change-transform"
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: '50% 100% -25px',
              backfaceVisibility: 'hidden',
            }}
            initial={{
              y: 35,
              opacity: 0,
              rotateX: -65,
              filter: 'blur(10px)',
              scale: 0.95,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
              rotateX: 0,
              filter: 'blur(0px)',
              scale: 1,
            }}
            viewport={{ once, amount: 0.15 }}
            transition={{
              duration: duration || 0.72,
              delay: delay + idx * (stagger || 0.05),
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -2,
              rotateX: 6,
              transition: { duration: 0.25, ease: 'easeOut' },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
