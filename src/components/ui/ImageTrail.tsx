'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils/helpers';

interface ImageTrailProps {
  images: string[];
  className?: string;
  size?: number;
  spacing?: number;
  speed?: number;
  opacity?: number;
  borderRadius?: string;
}

export function ImageTrail({
  images,
  className,
  size = 60,
  spacing = 20,
  speed = 1,
  opacity = 0.4,
  borderRadius = '12px',
}: ImageTrailProps) {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; image: string; rotation: number; scale: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const initialTrail = useMemo(() => {
    const newTrail: Array<{ x: number; y: number; image: string; rotation: number; scale: number }> = [];
    for (let i = 0; i < 10; i++) {
      newTrail.push({
        x: -size,
        y: -size,
        image: images[Math.floor(Math.random() * images.length)],
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
      });
    }
    return newTrail;
  }, [images, size]);

  useEffect(() => {
    if (reducedMotion || images.length === 0) return;

    const container = containerRef.current;
    if (!container) return;

    setTrail(initialTrail);
  }, [images, reducedMotion, initialTrail]);

  useEffect(() => {
    if (reducedMotion || images.length === 0) return;

    let animationId: number;

    const animate = () => {
      setTrail(prev => prev.map((item, index) => {
        const targetX = index * (size + spacing);
        const targetY = 0;
        
        return {
          ...item,
          x: item.x + (targetX - item.x) * 0.1 * speed,
          y: item.y + (targetY - item.y) * 0.1 * speed,
          rotation: item.rotation + speed * 0.5,
          scale: item.scale,
        };
      }));

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [images, speed, size, spacing]);

  if (reducedMotion || images.length === 0) {
    return (
      <div className={cn('relative', className)}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className="hidden"
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {trail.map((item, index) => (
          <motion.img
            key={index}
            src={item.image}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              width: size,
              height: size,
              borderRadius,
              opacity,
              transform: `rotate(${item.rotation}deg) scale(${item.scale})`,
              pointerEvents: 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}