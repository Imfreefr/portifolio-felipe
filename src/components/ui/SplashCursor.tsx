'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils/helpers';

interface SplashCursorProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  size?: number;
  particleCount?: number;
  disabled?: boolean;
}

export function SplashCursor({
  children,
  className,
  color = '#d94a5f',
  size = 8,
  particleCount = 15,
  disabled = false,
}: SplashCursorProps) {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (disabled || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newParticles: Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }> = [];

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        newParticles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: Math.random() * 30 + 30,
          size: Math.random() * size * 0.5 + size * 0.5,
        });
      }

      setParticles(prev => [...prev.slice(-50), ...newParticles]);
    };

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [disabled, particleCount, reducedMotion]);

  useEffect(() => {
    if (disabled || reducedMotion) return;

    let animationId: number;

    const animate = () => {
      setParticles(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.1,
          life: p.life + 1,
        }))
        .filter(p => p.life < p.maxLife)
      );

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
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
    >
      {children}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: color,
              borderRadius: '50%',
              opacity: 1 - particle.life / particle.maxLife,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}