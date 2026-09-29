import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * BorderBeam
 * Inspired by Unseen & Fantik Studio:
 * Luminous gradient beam that travels continuously around the perimeter
 * of cards or sections, creating an award-winning cybernetic highlight.
 */
export default function BorderBeam({
  size = 200,
  duration = 8,
  delay = 0,
  colorFrom = '#00f0ff',
  colorTo = '#8a2be2',
  borderWidth = 1.5,
  className = '',
}) {
  const { isDark } = useTheme();

  return (
    <div
      aria-hidden="true"
      style={{
        '--size': `${size}px`,
        '--duration': `${duration}s`,
        '--delay': `${delay}s`,
        '--color-from': colorFrom,
        '--color-to': colorTo,
        '--border-width': `${borderWidth}px`,
      }}
      className={`pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden ${className}`}
    >
      <div
        className="absolute aspect-square inset-0 m-auto animate-border-beam"
        style={{
          width: 'calc(100% + var(--size))',
          height: 'calc(100% + var(--size))',
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 60deg, var(--color-from) 90deg, var(--color-to) 120deg, transparent 150deg, transparent 360deg)`,
          opacity: isDark ? 0.75 : 0.5,
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: 'var(--border-width)',
        }}
      />
    </div>
  );
}
