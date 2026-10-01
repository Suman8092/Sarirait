import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useMotionPointer from '../hooks/useMotionPointer';

/**
 * SpotlightCard
 * Provides a high-end 3D card experience with subtle mouse-tracking tilt,
 * cursor spotlight glow, specular border lighting, and smooth return physics.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 240, 255, 0.16)',
  borderColor = 'rgba(0, 240, 255, 0.45)',
  tiltIntensity = 3,
  elevation = 4,
  style,
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
  const supportsSpotlight = useMotionPointer();

  useEffect(() => {
    if (!supportsSpotlight) {
      if (glowRef.current) glowRef.current.style.opacity = '0';
      if (borderRef.current) borderRef.current.style.opacity = '0';
      if (contentRef.current) contentRef.current.style.transform = 'none';
    }
    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, [supportsSpotlight]);

  const renderPointerState = () => {
    frameRef.current = 0;
    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const x = pointerRef.current.x - bounds.left;
    const y = pointerRef.current.y - bounds.top;
    card.style.setProperty('--spotlight-x', `${x}px`);
    card.style.setProperty('--spotlight-y', `${y}px`);

    const horizontal = (x / Math.max(bounds.width, 1) - 0.5) * tiltIntensity;
    const vertical = (0.5 - y / Math.max(bounds.height, 1)) * (tiltIntensity * 0.9);

    if (contentRef.current) {
      contentRef.current.style.transform = `perspective(1000px) rotateX(${vertical.toFixed(2)}deg) rotateY(${horizontal.toFixed(2)}deg) translateZ(${elevation}px)`;
    }
  };

  const handleMouseMove = (event) => {
    onMouseMove?.(event);
    if (!supportsSpotlight) return;
    pointerRef.current = { x: event.clientX, y: event.clientY };
    if (!frameRef.current) frameRef.current = window.requestAnimationFrame(renderPointerState);
  };

  const handleMouseEnter = (event) => {
    onMouseEnter?.(event);
    if (!supportsSpotlight) return;
    if (glowRef.current) glowRef.current.style.opacity = '1';
    if (borderRef.current) borderRef.current.style.opacity = '1';
    if (contentRef.current) {
      contentRef.current.style.transition = 'transform 100ms ease-out';
    }
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
      // Smooth physical spring-like return
      contentRef.current.style.transition = 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)';
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
      style={{ '--spotlight-color': spotlightColor, '--spotlight-border': borderColor, ...style }}
      {...props}
    >
      {/* Interactive cursor spotlight glow */}
      <div
        ref={glowRef}
        className="spotlight-card__glow pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300"
      />
      {/* Specular border accent */}
      <div
        ref={borderRef}
        className="spotlight-card__border pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300"
      />
      {/* 3D Elevated Content */}
      <div 
        ref={contentRef} 
        className="spotlight-card__content relative z-10 w-full h-full flex flex-col justify-between"
      >
        {children}
      </div>
    </motion.div>
  );
}
