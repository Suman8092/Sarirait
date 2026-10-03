import React from 'react';
import { motion } from 'framer-motion';

/**
 * MaskedHeading
 * Splits large headings into individual words with masked upward kinetic reveals.
 * Words rise sequentially one by one ("pehla word, fir dusra, fir teesra")
 * creating a high-production editorial typography effect.
 */
export default function MaskedHeading({
  lines = [],
  children,
  className = '',
  as: Component = 'h2',
  delay = 0,
  stagger = 0.065,
  duration = 0.65,
  once = true
}) {
  const headingLines = lines.length > 0 
    ? lines 
    : React.Children.toArray(children);

  let globalWordIndex = 0;
  const getIndex = () => globalWordIndex++;

  const renderWordsFromNode = (node) => {
    if (typeof node === 'string') {
      const parts = node.split(/(\s+)/);
      return parts.map((part, pIdx) => {
        if (/^\s+$/.test(part)) {
          return " ";
        }
        if (!part) return null;
        const currentIdx = getIndex();
        return (
          <span 
            key={`word-${currentIdx}`} 
            className="inline-block overflow-hidden align-baseline py-0.5"
          >
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: '115%', opacity: 0, rotateX: 28, filter: 'blur(3px)' }}
              whileInView={{ y: '0%', opacity: 1, rotateX: 0, filter: 'blur(0px)' }}
              viewport={{ once, amount: 0.15 }}
              transition={{
                duration: duration,
                delay: delay + currentIdx * stagger,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {part}
            </motion.span>
          </span>
        );
      });
    }

    if (React.isValidElement(node)) {
      const parsedChildren = React.Children.map(node.props.children, child =>
        renderWordsFromNode(child)
      );
      return React.cloneElement(node, {
        ...node.props,
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
          className="block py-0.5 leading-[1.12]"
        >
          {renderWordsFromNode(line)}
        </span>
      ))}
    </Component>
  );
}
