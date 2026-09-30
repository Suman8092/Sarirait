import React, { useEffect, useLayoutEffect, useRef } from 'react';

export default function MotionSystem() {
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-motion-reveal]').forEach((target) => {
        target.classList.add('is-motion-visible');
      });
      return undefined;
    }

    root.classList.add('motion-ready');
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-motion-visible');
        currentObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.16,
      rootMargin: '0px 0px -48px 0px',
    });

    const observeTarget = (target) => {
      if (!target.classList.contains('is-motion-visible')) observer.observe(target);
    };

    const scanNode = (node) => {
      if (node instanceof Element && node.matches('[data-motion-reveal]')) observeTarget(node);
      node.querySelectorAll?.('[data-motion-reveal]').forEach(observeTarget);
    };

    scanNode(document);

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(scanNode));
    });
    mutations.observe(document.getElementById('root') || document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      root.classList.remove('motion-ready');
    };
  }, []);

  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) return undefined;

    const activeTargets = new Set();
    const observedTargets = new Set();
    let frameId = 0;

    const updateTargets = () => {
      frameId = 0;
      const viewportHeight = Math.max(window.innerHeight, 1);
      const depthScale = window.innerWidth < 640 ? 0.42 : window.innerWidth < 1024 ? 0.68 : 1;

      activeTargets.forEach((target) => {
        const bounds = target.getBoundingClientRect();
        const distanceFromCenter = (bounds.top + bounds.height / 2 - viewportHeight / 2) / viewportHeight;
        const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter));
        const depth = Number(target.dataset.scrollDepth) || 14;
        target.style.setProperty('--scroll-parallax-y', `${normalizedDistance * depth * depthScale}px`);
      });
    };

    const scheduleUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateTargets);
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
    }, { rootMargin: '120px 0px' });

    const observeTarget = (target) => {
      if (observedTargets.has(target)) return;
      observedTargets.add(target);
      observer.observe(target);
    };

    const scanNode = (node) => {
      if (node instanceof Element && node.matches('[data-scroll-depth]')) observeTarget(node);
      node.querySelectorAll?.('[data-scroll-depth]').forEach(observeTarget);
    };

    scanNode(document);
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(scanNode));
    });
    mutations.observe(document.getElementById('root') || document.body, { childList: true, subtree: true });

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
      activeTargets.forEach((target) => {
        target.style.setProperty('--scroll-parallax-y', '0px');
        target.classList.remove('is-scroll-parallax-active');
      });
    };
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return undefined;

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

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('blur', handleBlur);
      if (frameId) window.cancelAnimationFrame(frameId);
      resetEffects();
    };
  }, []);

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
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="site-scroll-progress" aria-hidden="true">
      <span ref={progressRef} />
    </div>
  );
}
