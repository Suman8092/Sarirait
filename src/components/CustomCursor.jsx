import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  });
  const [isVisible, setIsVisible] = useState(false);
  const { isDark } = useTheme();

  // Coordinates using refs to avoid re-renders during high-frequency mouse moves
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isLoopRunning = useRef(false);
  const isVisibleRef = useRef(false);
  const rafId = useRef(null);

  const isView = cursorVariant === 'view';
  const isHover = cursorVariant === 'hover';
  const targetScale = isView ? 2.2 : isHover ? 1.45 : 1.0;
  const targetScaleRef = useRef(targetScale);
  const currentScale = useRef(1.0);

  // Smooth lerp animation loop for the outer ring with idle sleep
  useEffect(() => {
    if (isTouchDevice) return;

    const render = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;
      const dx = targetX - ringPos.current.x;
      const dy = targetY - ringPos.current.y;
      const ds = targetScaleRef.current - currentScale.current;

      // If outer ring has caught up and scale is settled, pause loop
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1 && Math.abs(ds) < 0.01) {
        ringPos.current.x = targetX;
        ringPos.current.y = targetY;
        currentScale.current = targetScaleRef.current;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(${targetScaleRef.current})`;
        }
        isLoopRunning.current = false;
        return;
      }

      ringPos.current.x += dx * 0.25;
      ringPos.current.y += dy * 0.25;
      currentScale.current += ds * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${currentScale.current})`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    const wakeLoop = () => {
      if (!isLoopRunning.current) {
        isLoopRunning.current = true;
        rafId.current = requestAnimationFrame(render);
      }
    };

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      wakeLoop();
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const viewTrigger = target.closest('[data-cursor="view"]');
      if (viewTrigger) {
        setCursorVariant('view');
        setCursorText('VIEW');
        wakeLoop();
        return;
      }

      const interactive = target.closest('button, a, [role="button"], input, select, textarea');
      if (interactive) {
        setCursorVariant('hover');
        setCursorText('');
        wakeLoop();
        return;
      }

      setCursorVariant('default');
      setCursorText('');
      wakeLoop();
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
      wakeLoop();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = null;
      isLoopRunning.current = false;
    };
  }, [isTouchDevice]);

  useEffect(() => {
    targetScaleRef.current = targetScale;
  }, [targetScale]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer Fluid Follower Ring - NO transition-transform to prevent animation collision */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center font-mono-code font-bold transition-opacity transition-colors duration-150 ease-out ${
          !isVisible ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          width: 32,
          height: 32,
          backgroundColor: isView
            ? 'rgba(0, 240, 255, 0.95)'
            : isHover
            ? (isDark ? 'rgba(0, 240, 255, 0.12)' : 'rgba(2, 132, 199, 0.12)')
            : (isDark ? 'rgba(0, 240, 255, 0.04)' : 'rgba(2, 132, 199, 0.05)'),
          borderColor: isView
            ? '#00f0ff'
            : isHover
            ? (isDark ? 'rgba(0, 240, 255, 0.7)' : 'rgba(2, 132, 199, 0.8)')
            : (isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(15, 23, 42, 0.25)'),
          borderWidth: 1.5,
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%) scale(1)'
        }}
      >
        {isView && (
          <span className="text-[7px] tracking-wider text-black font-extrabold select-none">
            {cursorText}
          </span>
        )}
      </div>

      {/* Central Immediate Pointer Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-opacity duration-150 ${
          !isVisible || isView ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          width: 5,
          height: 5,
          backgroundColor: isHover
            ? (isDark ? '#00f0ff' : '#0284c7')
            : (isDark ? '#ffffff' : '#0f172a'),
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)'
        }}
      />
    </>
  );
}
