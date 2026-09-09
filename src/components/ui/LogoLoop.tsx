'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils/helpers';

interface LogoLoopProps {
  logos: Array<{ src: string; alt: string }>;
  className?: string;
  size?: number;
  gap?: number;
  speed?: number;
  paused?: boolean;
  color?: string;
}

export function LogoLoop({
  logos,
  className,
  size = 60,
  gap = 40,
  speed = 1,
  paused = false,
  color = '#d94a5f',
}: LogoLoopProps) {
  const [isPaused, setIsPaused] = useState(paused);
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    let animationId: number;
    let lastTime = 0;
    const distance = logos.length * (size + gap);

    const animate = (time: number) => {
      if (isPaused || reducedMotion) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      const container = containerRef.current;
      if (!container) return;

      const currentTransform = container.style.transform;
      const match = currentTransform.match(/translateX\((-?[\d.]+)px\)/);
      let currentX = match ? parseFloat(match[1]) : 0;

      const moveAmount = speed * 50 * deltaTime;
      currentX -= moveAmount;

      if (Math.abs(currentX) >= distance) {
        currentX += distance;
      }

      container.style.transform = `translateX(${currentX}px)`;
      animationId = requestAnimationFrame(animate);
    };

    if (!reducedMotion) {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isPaused, logos.length, size, gap, speed, reducedMotion]);

  const togglePause = () => setIsPaused(!isPaused);

  if (reducedMotion) {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        {logos.map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.alt}
            width={size}
            height={size}
            className="object-contain"
          />
        ))}
      </div>
    );
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.style.filter = 'grayscale(0%) opacity(1)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.style.filter = 'grayscale(100%) opacity(0.6)';
  };

  if (reducedMotion) {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        {logos.map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.alt}
            width={size}
            height={size}
            className="object-contain"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex items-center gap-4 whitespace-nowrap will-change-transform"
        style={{ gap: `${gap}px` }}
      >
        {logos.map((logo, i) => (
          <motion.img
            key={i}
            src={logo.src}
            alt={logo.alt}
            width={size}
            height={size}
            className="object-contain flex-shrink-0"
            style={{ filter: 'grayscale(100%) opacity(0.6)', transition: 'filter 0.3s' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
        {logos.map((logo, i) => (
          <motion.img
            key={`${i}-clone`}
            src={logo.src}
            alt={logo.alt}
            width={size}
            height={size}
            className="object-contain flex-shrink-0"
            style={{ filter: 'grayscale(100%) opacity(0.6)', transition: 'filter 0.3s' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
    </div>
  );
}