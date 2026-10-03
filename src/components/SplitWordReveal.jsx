import React, { useRef, useState, useEffect } from 'react';

/**
 * SplitWordReveal
 * Authentic Brainly-style 3D FlipCase Word Reveal.
 * Dual-face (text-front / text-back) 3D cylindrical roller with sequential word timing.
 * Reference: demo.casethemes.net/brainly
 */
export default function SplitWordReveal({
  text = '',
  className = '',
  as: Component = 'span',
  delay = 0,
  stagger = 0.045,
  duration = 0.85,
  once = true
}) {
  const containerRef = useRef(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkImmediate = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100 && rect.bottom > -50) {
          setIsTriggered(true);
          return true;
        }
      }
      return false;
    };

    const alreadyInView = checkImmediate();
    if (alreadyInView && once) return;

    if (!window.IntersectionObserver) {
      setIsTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsTriggered(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setIsTriggered(false);
            setHasFinished(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [once]);

  useEffect(() => {
    if (!isTriggered) return;
    const totalTimeMs = (delay + words.length * stagger + (duration || 0.85) + 0.15) * 1000;
    const timer = setTimeout(() => {
      setHasFinished(true);
    }, Math.max(800, totalTimeMs));
    return () => clearTimeout(timer);
  }, [isTriggered, delay, words.length, stagger, duration]);

  return (
    <Component 
      ref={containerRef} 
      className={`inline-flex flex-wrap ${className}`} 
      aria-label={text}
    >
      {words.map((word, idx) => {
        const wordDelay = (delay + idx * stagger).toFixed(3);
        const animStateClass = isTriggered 
          ? (hasFinished ? 'has-finished' : 'is-animating') 
          : '';

        return (
          <span 
            key={`split-word-${idx}`} 
            className={`brainly-flip-item mr-[0.28em] last:mr-0 ${animStateClass}`}
            style={{
              '--brainly-delay': `${wordDelay}s`,
            }}
          >
            <span className="brainly-flip-inner">
              <span className="brainly-text-front">
                {word}
              </span>
              <span className="brainly-text-back-wrap" aria-hidden="true">
                <span className="brainly-text-back">
                  {word}
                </span>
              </span>
            </span>
          </span>
        );
      })}
    </Component>
  );
}
