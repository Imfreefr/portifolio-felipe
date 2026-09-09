'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils/helpers';

interface SplitTextProps {
  text: string;
  className?: string;
  splitBy?: 'chars' | 'words' | 'lines';
  delay?: number;
  duration?: number;
  stagger?: number;
  from?: { opacity: number; y: number; x: number; rotate?: number };
  to?: { opacity: number; y: number; x: number; rotate?: number };
  animate?: boolean;
}

export function SplitText({
  text,
  className,
  splitBy = 'chars',
  delay = 0,
  duration = 0.5,
  stagger = 0.02,
  from = { opacity: 0, y: 20, x: 0 },
  to = { opacity: 1, y: 0, x: 0 },
  animate = true,
}: SplitTextProps) {
  const reducedMotion = useReducedMotion();

  const splitText = (text: string, by: string): string[] => {
    if (by === 'chars') return text.split('');
    if (by === 'words') return text.split(' ').map(w => w + ' ');
    if (by === 'lines') return text.split('\n').map(l => l + '\n');
    return [text];
  };

  const items = splitText(text, splitBy);

  if (reducedMotion || !animate) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={cn('inline-flex', className)} aria-label={text}>
      {items.map((item, index) => (
        <motion.span
          key={index}
          initial={from}
          animate={to}
          transition={{
            duration,
            delay: delay + index * stagger,
            ease: 'easeOut',
          }}
          style={{ display: 'inline-block', whiteSpace: splitBy === 'chars' ? 'nowrap' : 'pre-wrap' }}
        >
          {item}
        </motion.span>
      ))}
    </span>
  );
}

export function SplitTextLines({
  text,
  className,
  delay = 0,
  duration = 0.6,
  stagger = 0.1,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}) {
  const reducedMotion = useReducedMotion();
  const lines = text.split('\n');

  if (reducedMotion) {
    return <div className={className}>{text}</div>;
  }

  return (
    <div className={cn('flex flex-col', className)} aria-label={text}>
      {lines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration,
            delay: delay + index * stagger,
            ease: 'easeOut',
          }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}