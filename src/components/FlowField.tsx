'use client';

import { useReducedMotion } from '../hooks/useIntersectionObserver';
import { cn } from '../utils/helpers';

interface FlowFieldProps {
  className?: string;
  color?: 'vinho' | 'primary' | 'accent';
  intensity?: number;
}

export function FlowField({ 
  className = '', 
  color = 'vinho',
  intensity = 1 
}: FlowFieldProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div 
        className={className} 
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'linear-gradient(135deg, rgba(217, 74, 95, 0.03) 0%, transparent 50%, rgba(163, 40, 57, 0.02) 100%)'
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{ 
        width: '100%', 
        height: '100%', 
        zIndex: 0,
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(217, 74, 95, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(163, 40, 57, 0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(217, 74, 95, 0.04) 0%, transparent 70%),
          linear-gradient(135deg, rgba(217, 74, 95, 0.02) 0%, transparent 50%, rgba(163, 40, 57, 0.02) 100%)
        `
      }}
      aria-hidden="true"
    />
  );
}