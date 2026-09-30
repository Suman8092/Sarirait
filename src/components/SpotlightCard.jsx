import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 240, 255, 0.14)',
  borderColor = 'rgba(0, 240, 255, 0.35)',
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...props
}) {
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const glowRef = useRef(null);
  const borderRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const supportsSpotlight = useRef(false);

  useEffect(() => {
    supportsSpotlight.current = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    ).matches;

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const renderPointerState = () => {
    frameRef.current = 0;
    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const x = pointerRef.current.x - bounds.left;
    const y = pointerRef.current.y - bounds.top;
    card.style.setProperty('--spotlight-x', `${x}px`);
    card.style.setProperty('--spotlight-y', `${y}px`);

    const horizontal = (x / Math.max(bounds.width, 1) - 0.5) * 3.6;
    const vertical = (0.5 - y / Math.max(bounds.height, 1)) * 3.2;
    if (contentRef.current) {
      contentRef.current.style.transform = `perspective(1000px) rotateX(${vertical}deg) rotateY(${horizontal}deg) translateZ(0)`;
    }
  };

  const handleMouseMove = (event) => {
    onMouseMove?.(event);
    if (!supportsSpotlight.current) return;
    pointerRef.current = { x: event.clientX, y: event.clientY };
    if (!frameRef.current) frameRef.current = window.requestAnimationFrame(renderPointerState);
  };

  const handleMouseEnter = (event) => {
    onMouseEnter?.(event);
    if (!supportsSpotlight.current) return;
    if (glowRef.current) glowRef.current.style.opacity = '1';
    if (borderRef.current) borderRef.current.style.opacity = '1';
  };

  const handleMouseLeave = (event) => {
    onMouseLeave?.(event);
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }
    if (glowRef.current) glowRef.current.style.opacity = '0';
    if (borderRef.current) borderRef.current.style.opacity = '0';
    if (contentRef.current) {
      contentRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card relative overflow-hidden ${className}`}
      style={{ '--spotlight-color': spotlightColor, '--spotlight-border': borderColor }}
      {...props}
    >
      <div
        ref={glowRef}
        className="spotlight-card__glow pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300"
      />
      <div
        ref={borderRef}
        className="spotlight-card__border pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300"
      />
      <div ref={contentRef} className="spotlight-card__content relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}
