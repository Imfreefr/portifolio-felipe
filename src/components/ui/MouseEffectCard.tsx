'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils/helpers';

interface MouseEffectCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
  perspective?: number;
  borderRadius?: string;
  background?: string;
  border?: string;
}

export function MouseEffectCard({
  children,
  className,
  intensity = 1,
  scale = 1.02,
  perspective = 1000,
  borderRadius = '1.5rem',
  background = 'rgba(23, 23, 23, 0.85)',
  border = '1px solid rgb(38 38 38)',
}: MouseEffectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const card = cardRef.current;
    if (!card || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setMousePosition({ x: 0, y: 0 });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion]);

  const rotateX = (mousePosition.y / 150) * intensity * -1;
  const rotateY = (mousePosition.x / 150) * intensity;

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden transition-all duration-500 ease-spring',
        'bg-preto-900/80 backdrop-blur-sm border border-preto-700',
        'card-hover group',
        className
      )}
      style={{
        borderRadius,
        background,
        border,
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        transform: isHovering && !reducedMotion
          ? `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
          : 'none',
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
        if (!reducedMotion) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          setMousePosition({ x, y });
        }
      }}
    >
      <motion.div
        style={{
          transform: isHovering && !reducedMotion
            ? `translateZ(20px) scale(1.02)`
            : 'translateZ(0px) scale(1)',
          transition: 'transform 0.3s ease-out',
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {!reducedMotion && isHovering && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-vinho-500/10 via-transparent to-transparent rounded-inherit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {!reducedMotion && isHovering && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vinho-500/50 to-transparent rounded-t-inherit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
}