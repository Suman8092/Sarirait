import React, { useEffect, useMemo, useRef } from 'react';

function getNumericParts(value) {
  const match = String(value).match(/^([^\d-]*)(-?[\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const numericText = match[2].replaceAll(',', '');
  const amount = Number(numericText);
  if (!Number.isFinite(amount)) return null;

  return {
    prefix: match[1],
    suffix: match[3],
    amount,
    decimals: (numericText.split('.')[1] || '').length,
  };
}

export default function CountUpValue({ value, duration = 1250, className = '' }) {
  const valueRef = useRef(null);
  const parts = useMemo(() => getNumericParts(value), [value]);

  useEffect(() => {
    const node = valueRef.current;
    if (!node || !parts || !('IntersectionObserver' in window)) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let frameId = 0;
    const numberFormat = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: parts.decimals,
      maximumFractionDigits: parts.decimals,
    });

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      const startedAt = performance.now();
      const animate = (now) => {
        const progress = Math.max(0, Math.min(1, (now - startedAt) / Math.max(duration, 1)));
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = parts.amount * easedProgress;
        node.textContent = `${parts.prefix}${numberFormat.format(current)}${parts.suffix}`;

        if (progress < 1) frameId = window.requestAnimationFrame(animate);
        else node.textContent = value;
      };

      frameId = window.requestAnimationFrame(animate);
    }, { threshold: 0.6 });

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [duration, parts, value]);

  return (
    <span ref={valueRef} className={className} aria-label={String(value)}>
      {value}
    </span>
  );
}
