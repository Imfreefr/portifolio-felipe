'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils/helpers';

interface TargetCursorProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  color?: string;
  disabled?: boolean;
}

export function TargetCursor({
  children,
  className,
  size = 40,
  color = '#d94a5f',
  disabled = false,
}: TargetCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled, reducedMotion]);

  if (disabled || reducedMotion) {
    return (
      <div className={cn('relative', className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      style={{ cursor: 'none' }}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed pointer-events-none z-50"
            style={{
              left: position.x - size / 2,
              top: position.y - size / 2,
              width: size,
              height: size,
              borderRadius: '50%',
              border: `2px solid ${color}`,
              pointerEvents: 'none',
              mixBlendMode: 'difference',
              zIndex: 9999,
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: `1px solid ${color}`, opacity: 0.5 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{
        __html: `
          * { cursor: none !important; }
          button, a, input, textarea, select { cursor: none !important; }
        `
      }} />
    </div>
  );
}