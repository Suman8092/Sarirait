import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import useMotionPointer from '../hooks/useMotionPointer';

export default function MotionSystem() {
  const progressRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const pointerMotion = useMotionPointer();

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-motion-reveal]').forEach((target) => {
        target.classList.add('is-motion-visible');
      });
      return undefined;
    }

    root.classList.add('motion-ready');
    const pendingTargets = new Set();
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-motion-visible');
        entry.target.setAttribute('data-motion-revealed', 'true');
        pendingTargets.delete(entry.target);
        currentObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -24px 0px',
    });

    const observeTarget = (target) => {
      if (target.classList.contains('is-motion-visible') || target.hasAttribute('data-motion-revealed') || pendingTargets.has(target)) return;
      pendingTargets.add(target);
      observer.observe(target);
    };

    const scanNode = (node) => {
      if (node instanceof Element && node.matches('[data-motion-reveal]')) observeTarget(node);
      node.querySelectorAll?.('[data-motion-reveal]').forEach(observeTarget);
    };

    scanNode(document);

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach(scanNode);
        if (record.type === 'attributes' && record.attributeName === 'class') {
          const el = record.target;
          if (el instanceof Element && el.hasAttribute('data-motion-revealed') && !el.classList.contains('is-motion-visible')) {
            el.classList.add('is-motion-visible');
          }
        }
      });
      pendingTargets.forEach((target) => {
        if (!target.isConnected) {
          observer.unobserve(target);
          pendingTargets.delete(target);
        }
      });
    });
    mutations.observe(document.getElementById('root') || document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });

    // A keyboard user can focus a card before its entrance finishes.
    const revealFocused = (event) => {
      let target = event.target instanceof Element ? event.target : null;
      while (target) {
        if (target.matches('[data-motion-reveal]')) {
          target.classList.add('is-motion-visible');
          target.setAttribute('data-motion-revealed', 'true');
          pendingTargets.delete(target);
          observer.unobserve(target);
        }
        target = target.parentElement;
      }
    };
    document.addEventListener('focusin', revealFocused);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      document.removeEventListener('focusin', revealFocused);
      root.classList.remove('motion-ready');
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (
      !('IntersectionObserver' in window)
    ) return undefined;

    const activeTargets = new Set();
    const observedTargets = new Set();
    const activeSections = new Set();
    const observedSections = new Set();
    const root = document.documentElement;
    let frameId = 0;

    const updateTargets = () => {
      frameId = 0;
      if (document.hidden) return;
      const viewportHeight = Math.max(window.innerHeight, 1);
      const depthScale = window.innerWidth < 640 ? 0.42 : window.innerWidth < 1024 ? 0.68 : 1;

      if (!reducedMotion) activeTargets.forEach((target) => {
        const bounds = target.getBoundingClientRect();
        const distanceFromCenter = (bounds.top + bounds.height / 2 - viewportHeight / 2) / viewportHeight;
        const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter));
        const depth = Number(target.dataset.scrollDepth) || 14;
        target.style.setProperty('--scroll-parallax-y', `${normalizedDistance * depth * depthScale}px`);
      });

      activeSections.forEach((section) => {
        const bounds = section.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (viewportHeight - bounds.top) / (viewportHeight + bounds.height)));
        section.style.setProperty('--section-progress', progress.toFixed(3));
      });
    };

    const scheduleUpdate = () => {
      if (!frameId && !document.hidden) frameId = window.requestAnimationFrame(updateTargets);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeTargets.add(entry.target);
          entry.target.classList.add('is-scroll-parallax-active');
          scheduleUpdate();
        } else {
          activeTargets.delete(entry.target);
          entry.target.style.setProperty('--scroll-parallax-y', '0px');
          entry.target.classList.remove('is-scroll-parallax-active');
        }
      });
    }, { rootMargin: '80px 0px' });

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        target.classList.toggle('is-section-active', isIntersecting);
        if (isIntersecting) activeSections.add(target);
        else activeSections.delete(target);
      });
      scheduleUpdate();
    });

    const observeTarget = (target) => {
      if (observedTargets.has(target)) return;
      observedTargets.add(target);
      observer.observe(target);
    };

    const observeSection = (section) => {
      if (observedSections.has(section)) return;
      observedSections.add(section);
      section.classList.add('motion-section');
      sectionObserver.observe(section);
    };

    const scanNode = (node) => {
      if (!reducedMotion) {
        if (node instanceof Element && node.matches('[data-scroll-depth]')) observeTarget(node);
        node.querySelectorAll?.('[data-scroll-depth]').forEach(observeTarget);
      }
      if (node instanceof Element && node.matches('main > section, footer')) observeSection(node);
      node.querySelectorAll?.('main > section, footer').forEach(observeSection);
    };

    scanNode(document);
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(scanNode));
      // Route transitions and filters remove nodes; release their observer references.
      observedTargets.forEach((target) => {
        if (!target.isConnected) {
          observer.unobserve(target);
          observedTargets.delete(target);
          activeTargets.delete(target);
        }
      });
      observedSections.forEach((section) => {
        if (!section.isConnected) {
          sectionObserver.unobserve(section);
          observedSections.delete(section);
          activeSections.delete(section);
        }
      });
    });
    mutations.observe(document.getElementById('root') || document.body, { childList: true, subtree: true });

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    const handleVisibility = () => {
      root.classList.toggle('motion-paused', document.hidden);
      if (document.hidden && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
      scheduleUpdate();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    handleVisibility();

    return () => {
      mutations.disconnect();
      observer.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      document.removeEventListener('visibilitychange', handleVisibility);
      root.classList.remove('motion-paused');
      if (frameId) window.cancelAnimationFrame(frameId);
      activeTargets.forEach((target) => {
        target.style.setProperty('--scroll-parallax-y', '0px');
        target.classList.remove('is-scroll-parallax-active');
      });
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!pointerMotion) return undefined;

    let activeTarget = null;
    let activeGlossyTarget = null;
    let frameId = 0;
    let pointer = { x: 0, y: 0 };

    const resetTarget = () => {
      if (!activeTarget) return;
      activeTarget.style.setProperty('--magnetic-x', '0px');
      activeTarget.style.setProperty('--magnetic-y', '0px');
      activeTarget.classList.remove('is-magnetic-active');
      activeTarget = null;
    };

    const resetGlossyTarget = () => {
      if (!activeGlossyTarget) return;
      activeGlossyTarget.classList.remove('is-glossy-active');
      activeGlossyTarget = null;
    };

    const applyOffset = () => {
      frameId = 0;
      if (activeTarget) {
        const bounds = activeTarget.getBoundingClientRect();
        const relativeX = (pointer.x - (bounds.left + bounds.width / 2)) / Math.max(bounds.width / 2, 1);
        const relativeY = (pointer.y - (bounds.top + bounds.height / 2)) / Math.max(bounds.height / 2, 1);
        activeTarget.style.setProperty('--magnetic-x', `${Math.max(-1, Math.min(1, relativeX)) * 5}px`);
        activeTarget.style.setProperty('--magnetic-y', `${Math.max(-1, Math.min(1, relativeY)) * 4}px`);
      }

      if (activeGlossyTarget) {
        const bounds = activeGlossyTarget.getBoundingClientRect();
        const x = ((pointer.x - bounds.left) / Math.max(bounds.width, 1)) * 100;
        const y = ((pointer.y - bounds.top) / Math.max(bounds.height, 1)) * 100;
        activeGlossyTarget.style.setProperty('--gloss-x', `${Math.max(0, Math.min(100, x))}%`);
        activeGlossyTarget.style.setProperty('--gloss-y', `${Math.max(0, Math.min(100, y))}%`);
      }
    };

    const handlePointerMove = (event) => {
      const pointerElement = event.target instanceof Element ? event.target : null;
      const nextTarget = pointerElement?.closest('[data-magnetic]') || null;
      if (nextTarget !== activeTarget) {
        resetTarget();
        activeTarget = nextTarget;
        activeTarget?.classList.add('is-magnetic-active');
      }

      const nextGlossyTarget = pointerElement?.closest('[data-glossy]') || null;
      if (nextGlossyTarget !== activeGlossyTarget) {
        resetGlossyTarget();
        activeGlossyTarget = nextGlossyTarget;
        activeGlossyTarget?.classList.add('is-glossy-active');
      }
      if (!activeTarget && !activeGlossyTarget) return;

      pointer = { x: event.clientX, y: event.clientY };
      if (!frameId) frameId = window.requestAnimationFrame(applyOffset);
    };

    const resetEffects = () => {
      resetTarget();
      resetGlossyTarget();
    };
    const handleScroll = resetEffects;
    const handleBlur = resetEffects;

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('blur', handleBlur);
    document.addEventListener('pointerleave', resetEffects);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('pointerleave', resetEffects);
      if (frameId) window.cancelAnimationFrame(frameId);
      resetEffects();
    };
  }, [pointerMotion]);

  useEffect(() => {
    const updateProgress = () => {
      const track = progressRef.current;
      if (!track) return;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      track.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
    };

    let frameId = 0;
    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateProgress();
      });
    };

    updateProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.getElementById('root') || document.body);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      resizeObserver.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="site-scroll-progress" aria-hidden="true">
      <span ref={progressRef} />
    </div>
  );
}
