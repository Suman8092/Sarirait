import React from 'react';
import { motion } from 'framer-motion';

/**
 * MaskedHeading
 * Brainly-style 3D Flip Tumble & Kinetic Blur Heading Reveal.
 * Words roll up sequentially in 3D perspective while resolving from
 * cinematic blur to crystal-clear focus ("pehla word, fir dusra, fir teesra").
 * Full support for gradient text classes and interactive micro-hover response.
 */
export default function MaskedHeading({
  lines = [],
  children,
  className = '',
  as: Component = 'h2',
  delay = 0,
  stagger = 0.06,
  duration = 0.72,
  once = true
}) {
  const headingLines = lines.length > 0 
    ? lines 
    : React.Children.toArray(children);

  let globalWordIndex = 0;
  const getIndex = () => globalWordIndex++;

  const renderWordsFromNode = (node, inheritedClass = '') => {
    if (typeof node === 'string') {
      const words = node.split(/\s+/).filter(Boolean);
      return words.map((word) => {
        const currentIdx = getIndex();
        return (
          <span 
            key={`word-${currentIdx}`} 
            className="inline-block align-baseline py-1 mr-[0.28em] last:mr-0 [perspective:1200px] [transform-style:preserve-3d]"
          >
            <motion.span
              className="inline-block will-change-transform"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: '50% 100% -25px',
                backfaceVisibility: 'hidden',
              }}
              initial={{
                y: 42,
                opacity: 0,
                rotateX: -65,
                filter: 'blur(12px)',
                scale: 0.95,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
                rotateX: 0,
                filter: 'blur(0px)',
                scale: 1,
              }}
              viewport={{ once, amount: 0.15 }}
              transition={{
                duration: duration || 0.72,
                delay: delay + currentIdx * (stagger || 0.06),
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -2,
                rotateX: 6,
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
            >
              <span className={`inline-block ${inheritedClass}`}>
                {word}
              </span>
            </motion.span>
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
    <Component className={className}>
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
