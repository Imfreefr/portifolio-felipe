'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils/helpers';

interface PixelTransitionProps {
  children: React.ReactNode;
  className?: string;
  pixelSize?: number;
  duration?: number;
  delay?: number;
  trigger?: 'hover' | 'click' | 'auto';
  direction?: 'horizontal' | 'vertical' | 'radial';
  color?: string;
}

export function PixelTransition({
  children,
  className,
  pixelSize = 8,
  duration = 800,
  delay = 0,
  trigger = 'hover',
  direction = 'horizontal',
  color = '#d94a5f',
}: PixelTransitionProps) {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (trigger === 'auto') {
      const timer = setTimeout(() => setIsActive(true), delay);
      return () => clearTimeout(timer);
    }
  }, [trigger, delay]);

  if (reducedMotion) {
    return (
      <div className={cn('relative', className)}>
        {children}
      </div>
    );
  }

  const createPixels = () => {
    const container = containerRef.current;
    if (!container) return [];

    const rect = container.getBoundingClientRect();
    const cols = Math.ceil(rect.width / pixelSize);
    const rows = Math.ceil(rect.height / pixelSize);
    const pixels: Array<{ x: number; y: number; delay: number }> = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let delayValue = 0;
        if (direction === 'horizontal') {
          delayValue = (col / cols) * 0.5;
        } else if (direction === 'vertical') {
          delayValue = (row / rows) * 0.5;
        } else {
          const centerX = cols / 2;
          const centerY = rows / 2;
          const dist = Math.sqrt(Math.pow(col - centerX, 2) + Math.pow(row - centerY, 2));
          const maxDist = Math.sqrt(Math.pow(cols / 2, 2) + Math.pow(rows / 2, 2));
          delayValue = (dist / maxDist) * 0.5;
        }

        pixels.push({
          x: col * pixelSize,
          y: row * pixelSize,
          delay: delayValue,
        });
      }
    }

    return pixels;
  };

  const pixels = createPixels();

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-block overflow-hidden', className)}
      onMouseEnter={() => trigger === 'hover' && setIsActive(true)}
      onMouseLeave={() => trigger === 'hover' && setIsActive(false)}
      onClick={() => trigger === 'click' && setIsActive(prev => !prev)}
    >
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {pixels.map((pixel, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: pixel.x,
              top: pixel.y,
              width: pixelSize,
              height: pixelSize,
              backgroundColor: color,
              borderRadius: '2px',
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={isActive ? { scale: [1, 0, 1], opacity: [1, 0, 1] } : { scale: 1, opacity: 1 }}
            transition={{
              duration: duration / 1000,
              delay: pixel.delay + index * 0.001,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}