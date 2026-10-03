import React, { useRef, useState, useEffect } from 'react';

/**
 * MaskedHeading
 * Authentic Brainly-style 3D FlipCase Heading Animation.
 * Dual-face (text-front / text-back) 3D cylindrical roller with sequential word timing.
 * Reference: demo.casethemes.net/brainly
 */
export default function MaskedHeading({
  lines = [],
  children,
  className = '',
  as: Component = 'h2',
  delay = 0,
  stagger = 0.08,
  duration = 0.85,
  once = true
}) {
  const containerRef = useRef(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const headingLines = lines.length > 0 
    ? lines 
    : React.Children.toArray(children);

  // Count total words for finish timer
  let totalWordCount = 0;
  const countWords = (node) => {
    if (typeof node === 'string') {
      totalWordCount += node.split(/\s+/).filter(Boolean).length;
    } else if (React.isValidElement(node)) {
      React.Children.forEach(node.props.children, countWords);
    }
  };
  headingLines.forEach(countWords);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if already in viewport on mount (e.g. Hero section)
    const checkImmediate = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100 && rect.bottom > -50) {
          setIsTriggered(true);
          return true;
        }
      }
      return false;
    };

    const alreadyInView = checkImmediate();
    if (alreadyInView && once) return;

    if (!window.IntersectionObserver) {
      setIsTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsTriggered(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setIsTriggered(false);
            setHasFinished(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [once]);

  // Transition to hasFinished state after animation completes to enable hover interactions
  useEffect(() => {
    if (!isTriggered) return;
    const totalTimeMs = (delay + totalWordCount * stagger + (duration || 0.85) + 0.15) * 1000;
    const timer = setTimeout(() => {
      setHasFinished(true);
    }, Math.max(800, totalTimeMs));
    return () => clearTimeout(timer);
  }, [isTriggered, delay, totalWordCount, stagger, duration]);

  let globalWordIndex = 0;
  const getIndex = () => globalWordIndex++;

  const renderWordsFromNode = (node, inheritedClass = '') => {
    if (typeof node === 'string') {
      const words = node.split(/\s+/).filter(Boolean);
      return words.map((word) => {
        const currentIdx = getIndex();
        const wordDelay = (delay + currentIdx * stagger).toFixed(3);
        const animStateClass = isTriggered 
          ? (hasFinished ? 'has-finished' : 'is-animating') 
          : '';

        return (
          <span 
            key={`word-${currentIdx}`} 
            className={`brainly-flip-item mr-[0.28em] last:mr-0 ${animStateClass}`}
            style={{
              '--brainly-delay': `${wordDelay}s`,
            }}
          >
            <span className="brainly-flip-inner">
              {/* Front Face */}
              <span className={`brainly-text-front ${inheritedClass}`}>
                {word}
              </span>
              {/* Back Face */}
              <span className="brainly-text-back-wrap" aria-hidden="true">
                <span className={`brainly-text-back ${inheritedClass}`}>
                  {word}
                </span>
              </span>
            </span>
          </span>
        );
      });
    }

    if (React.isValidElement(node)) {
      const nodeClass = node.props.className || '';
      const isGradient = /text-gradient/.test(nodeClass);
      const outerClass = isGradient 
        ? nodeClass.replace(/text-gradient-[a-z0-9_-]+/g, '').trim()
        : nodeClass;
      const innerClass = [
        inheritedClass,
        isGradient ? (nodeClass.match(/text-gradient-[a-z0-9_-]+/g) || []).join(' ') : ''
      ].filter(Boolean).join(' ');

      const parsedChildren = React.Children.map(node.props.children, child =>
        renderWordsFromNode(child, innerClass)
      );

      return React.cloneElement(node, {
        ...node.props,
        className: outerClass || undefined,
        children: parsedChildren
      });
    }

    return node;
  };

  return (
    <Component ref={containerRef} className={className}>
      {headingLines.map((line, lIdx) => (
        <span 
          key={`line-${lIdx}`} 
          className="block py-0.5 leading-[1.18]"
        >
          {renderWordsFromNode(line)}
        </span>
      ))}
    </Component>
  );
}
