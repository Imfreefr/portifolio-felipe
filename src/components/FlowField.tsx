'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useIntersectionObserver';

interface FlowFieldProps {
  className?: string;
  color?: 'vinho' | 'primary' | 'accent';
  intensity?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

const colorMap = {
  vinho: '#d94a5f',
  primary: '#0ea5e9',
  accent: '#d946ef',
};

function noise(x: number, y: number, time: number): number {
  const n = Math.sin(x * 0.01 + time * 0.3) * Math.cos(y * 0.01 + time * 0.2) +
            Math.sin(x * 0.005 - time * 0.15) * Math.cos(y * 0.005 - time * 0.1) * 0.5 +
            Math.sin((x + y) * 0.008 + time * 0.25) * 0.25;
  return n;
}

export function FlowField({ 
  className = '', 
  color = 'vinho',
  intensity = 1 
}: FlowFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use local variables with definite assignment
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    
    // Capture canvas and ctx as definitely non-null after checks
    const canvasEl = canvas;
    const ctxEl = ctx;

    function resize() {
      const rect = canvasEl.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      width = rect.width;
      height = rect.height;
      
      canvasEl.width = width * dpr;
      canvasEl.height = height * dpr;
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;
      
      ctxEl.scale(dpr, dpr);
      
      initParticles();
    }

    function initParticles() {
      particles = [];
      const count = Math.max(50, Math.min(200, Math.floor((width * height) / 15000) * intensity));
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          life: Math.random() * 100,
          maxLife: 100 + Math.random() * 200,
          size: 1 + Math.random() * 2,
          hue: Math.random() * 20,
        });
      }
    }

    function updateParticles(time: number) {
      const flowSpeed = 0.3 * intensity;

      particles.forEach(p => {
        const angle = noise(p.x, p.y, time) * Math.PI * 2;
        const force = 0.5 * intensity;
        
        p.vx += Math.cos(angle) * force;
        p.vy += Math.sin(angle) * force;
        
        p.vx *= 0.95;
        p.vy *= 0.95;
        
        p.x += p.vx * flowSpeed;
        p.y += p.vy * flowSpeed;
        
        p.life++;
        
        if (p.life > p.maxLife || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.vx = 0;
          p.vy = 0;
          p.life = 0;
          p.maxLife = 100 + Math.random() * 200;
          p.size = 1 + Math.random() * 2;
        }
      });
    }

    function drawParticles() {
      ctxEl.clearRect(0, 0, width, height);
      
      const baseColor = colorMap[color as keyof typeof colorMap];
      const r = parseInt(baseColor.slice(1, 3), 16);
      const g = parseInt(baseColor.slice(3, 5), 16);
      const b = parseInt(baseColor.slice(5, 7), 16);

      particles.forEach(p => {
        const lifeRatio = 1 - p.life / p.maxLife;
        const alpha = lifeRatio * 0.4 * intensity;
        
        if (alpha <= 0) return;

        ctxEl.beginPath();
        ctxEl.arc(p.x, p.y, p.size * lifeRatio, 0, Math.PI * 2);
        ctxEl.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctxEl.fill();
      });
    }

    function animate(time: number) {
      updateParticles(time * 0.001);
      drawParticles();
      
      animationRef.current = requestAnimationFrame(animate);
    }

    resize();
    setInitialized(true);
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [reducedMotion, color, intensity]);

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
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%', zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}