import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useLenis } from './SmoothScroll';

export default function ScrollToTop({ location }) {
  const { pathname, hash } = location;
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();
  const scrollOptions = useRef({ lenis, reducedMotion });
  useEffect(() => {
    scrollOptions.current = { lenis, reducedMotion };
  }, [lenis, reducedMotion]);

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const { lenis } = scrollOptions.current;
          if (lenis) {
            lenis.scrollTo(element, { offset: -80, duration: 1.2 });
          } else {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      const { lenis } = scrollOptions.current;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }
  }, [pathname, hash]);

  return null;
}
