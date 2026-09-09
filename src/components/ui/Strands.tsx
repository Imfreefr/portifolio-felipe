'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils/helpers';

interface StrandsProps {
  children: React.ReactNode;
  className?: string;
  count?: number;
  color?: string;
  speed?: number;
  length?: number;
  thickness?: number;
}

export function Strands({
  children,
  className,
  count = 20,
  color = '#d94a5f',
  speed = 1,
  length = 100,
  thickness = 1,
}: StrandsProps) {
  const [strands, setStrands] = useState<Array<{ x: number; y: number; angle: number; speed: number; length: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const newStrands: Array<{ x: number; y: number; angle: number; speed: number; length: number }> = [];

    for (let i = 0; i < count; i++) {
      newStrands.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.5 + 0.5) * speed,
        length: length * (Math.random() * 0.5 + 0.5),
      });
    }

    setStrands(newStrands);
  }, [count, speed, length, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    let animationId: number;

    const animate = () => {
      setStrands(prev => prev.map(strand => {
        const newX = strand.x + Math.cos(strand.angle) * strand.speed;
        const newY = strand.y + Math.sin(strand.angle) * strand.speed;

        let x = newX;
        let y = newY;
        let angle = strand.angle;

        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          if (x < 0 || x > rect.width) angle = Math.PI - angle;
          if (y < 0 || y > rect.height) angle = -angle;
        }

        return { ...strand, x, y, angle };
      }));

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className={cn('relative', className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
    >
      {children}
      <svg className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {strands.map((strand, index) => (
          <line
            key={index}
            x1={strand.x}
            y1={strand.y}
            x2={strand.x + Math.cos(strand.angle) * strand.length}
            y2={strand.y + Math.sin(strand.angle) * strand.length}
            stroke={color}
            strokeWidth={thickness}
            opacity="0.6"
          />
        ))}
      </svg>
    </div>
  );
}