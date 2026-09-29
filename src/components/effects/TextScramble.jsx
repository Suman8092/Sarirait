import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * TextScramble
 * Inspired by Active Theory & Why Zero University:
 * Cybernetic character decrypt animation where glyphs rapidly scramble
 * before locking into position. Triggers on mount and optionally on hover.
 */
const GLYPHS = '01XYZ_/*#@%+=<>~';

export default function TextScramble({
  text = '',
  className = '',
  triggerOnHover = true,
  autoStart = true,
  speed = 30, // ms per scramble tick
  scrambleDuration = 12, // number of scramble cycles before settling
  as: Component = 'span',
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);
  const frameRef = useRef(null);

  const scramble = useCallback(() => {
    if (isScrambling.current) return;
    isScrambling.current = true;

    const original = text;
    const length = original.length;
    let iteration = 0;
    const maxIterations = length + scrambleDuration;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return original
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n' || char === '•') return char;
            if (index < iteration - scrambleDuration / 2) {
              return original[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration > maxIterations) {
        clearInterval(interval);
        setDisplayText(original);
        isScrambling.current = false;
      }
    }, speed);

    frameRef.current = interval;
  }, [text, speed, scrambleDuration]);

  useEffect(() => {
    if (autoStart) {
      scramble();
    } else {
      setDisplayText(text);
    }

    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [text, autoStart, scramble]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      scramble();
    }
  };

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      className={`inline-block font-mono-code select-none ${className}`}
      {...props}
    >
      {displayText}
    </Component>
  );
}
