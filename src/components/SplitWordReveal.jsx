import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * SplitWordReveal
 * Splits a sentence into individual words with masked upward reveals.
 * Words rise with elegant, subtle staggered timing.
 */
export default function SplitWordReveal({
  text = '',
  className = '',
  as: Component = 'span',
  delay = 0,
  stagger = 0.04,
  duration = 0.65,
  once = true
}) {
  const reducedMotion = useReducedMotion();
  const words = text.split(' ').filter(Boolean);

  return (
    <Component className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`} aria-label={text}>
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden py-0.5" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={reducedMotion ? false : { y: '100%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once, amount: 0.2 }}
            transition={{
              duration: reducedMotion ? 0 : duration,
              delay: reducedMotion ? 0 : delay + Math.min(idx * stagger, 0.35),
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
