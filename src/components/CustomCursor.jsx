import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { isDark } = useTheme();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lagging spring effect
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        setIsTouchDevice(true);
      }
    };
    checkTouch();

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check what is currently hovered
      const target = e.target;
      const viewTrigger = target.closest('[data-cursor="view"]');
      const interactiveTrigger = target.closest('button, a, [role="button"], input, select, textarea');

      if (viewTrigger) {
        setCursorVariant('view');
        setCursorText('VIEW');
      } else if (interactiveTrigger) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer Smooth Follower Ring / Pill */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center font-mono-code font-bold"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          width: cursorVariant === 'view' ? 72 : cursorVariant === 'hover' ? 48 : 34,
          height: cursorVariant === 'view' ? 72 : cursorVariant === 'hover' ? 48 : 34,
          backgroundColor:
            cursorVariant === 'view'
              ? 'rgba(0, 240, 255, 0.95)'
              : cursorVariant === 'hover'
              ? (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.06)')
              : (isDark ? 'rgba(0, 240, 255, 0.04)' : 'rgba(2, 132, 199, 0.05)'),
          borderColor:
            cursorVariant === 'view'
              ? 'rgba(0, 240, 255, 1)'
              : cursorVariant === 'hover'
              ? (isDark ? 'rgba(0, 240, 255, 0.6)' : 'rgba(2, 132, 199, 0.7)')
              : (isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(15, 23, 42, 0.3)'),
          borderWidth: 1,
          backdropFilter: cursorVariant === 'view' ? 'blur(4px)' : 'blur(2px)'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      >
        {cursorVariant === 'view' && (
          <span className="text-[10px] tracking-wider text-black font-extrabold select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Central Immediate Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          width: cursorVariant === 'view' ? 0 : 5,
          height: cursorVariant === 'view' ? 0 : 5,
          backgroundColor: cursorVariant === 'hover' ? (isDark ? '#00f0ff' : '#0284c7') : (isDark ? '#ffffff' : '#0f172a'),
          opacity: cursorVariant === 'view' ? 0 : 1
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
