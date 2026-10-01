import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMotionPointer from '../hooks/useMotionPointer';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);
  const canUseSmoothWheel = useMotionPointer();

  useEffect(() => {
    if (!canUseSmoothWheel) return undefined;

    // Initialize Lenis with award-class inertia configuration
    const instance = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
      prevent: (node) => {
        return (
          node?.hasAttribute?.('data-lenis-prevent') ||
          !!node?.closest?.('[data-lenis-prevent]') ||
          !!node?.closest?.('.custom-scrollbar') ||
          !!node?.closest?.('.overflow-y-auto')
        );
      },
    });

    setLenis(instance);

    // Sync Lenis scroll with GSAP ScrollTrigger
    instance.on('scroll', ScrollTrigger.update);

    // Connect Lenis to requestAnimationFrame loop
    let rafId;
    function raf(time) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth anchor navigation for #hash links
    const handleAnchorClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = e.target instanceof Element ? e.target.closest('a[href^="#"]') : null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;

      const targetEl = document.getElementById(href.slice(1));
      if (targetEl) {
        e.preventDefault();
        instance.scrollTo(targetEl, {
          offset: -80,
          duration: 1.3,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, [canUseSmoothWheel]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
