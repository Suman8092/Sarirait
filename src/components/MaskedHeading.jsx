import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * MaskedHeading
 * Splits large headings into individual lines wrapped in overflow-hidden containers.
 * When the heading enters the viewport, lines reveal sequentially with a smooth upward motion.
 */
export default function MaskedHeading({
  lines = [],
  children,
  className = '',
  as: Component = 'h2',
  delay = 0,
  stagger = 0.12,
  duration = 0.85,
  once = true
}) {
  const reducedMotion = useReducedMotion();
  const headingLines = lines.length > 0 
    ? lines 
    : React.Children.toArray(children);

  return (
    <Component className={className}>
      {headingLines.map((line, idx) => (
        <span 
          key={idx} 
          className="block overflow-hidden py-0.5 leading-[1.12]"
        >
          <motion.span
            className="block"
            initial={reducedMotion ? false : { y: '105%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once, amount: 0.2 }}
            transition={{
              duration: reducedMotion ? 0 : duration,
              delay: reducedMotion ? 0 : delay + idx * stagger,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
