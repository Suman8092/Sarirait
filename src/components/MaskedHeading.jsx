import React from 'react';
import { motion } from 'framer-motion';

/**
 * MaskedHeading
 * Splits large headings into individual words with masked upward kinetic reveals.
 * Words rise sequentially one by one ("pehla word, fir dusra, fir teesra")
 * cleanly supporting gradient text classes by applying them directly to the word spans.
 */
export default function MaskedHeading({
  lines = [],
  children,
  className = '',
  as: Component = 'h2',
  delay = 0,
  stagger = 0.08,
  duration = 0.65,
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
            className="inline-block overflow-hidden align-baseline py-0.5 mr-[0.28em] last:mr-0"
          >
            <motion.span
              className={`inline-block will-change-transform ${inheritedClass}`}
              initial={{ y: '110%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once, amount: 0.15 }}
              transition={{
                duration: duration,
                delay: delay + currentIdx * stagger,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {word}
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
          className="block py-0.5 leading-[1.14]"
        >
          {renderWordsFromNode(line)}
        </span>
      ))}
    </Component>
  );
}
