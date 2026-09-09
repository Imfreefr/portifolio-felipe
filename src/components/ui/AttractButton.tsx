'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface AttractButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function AttractButton({
  children,
  onClick,
  className,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
}: AttractButtonProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [-8, 8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-8, 8]), { stiffness: 300, damping: 30 });
  const scale = useSpring(useTransform(mouseX, [-100, 100], [1, 1.02]), { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const sizeStyles = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-9 py-4.5 text-lg',
  };

  const variantStyles = {
    primary: 'bg-vinho-500 text-white border-none hover:bg-vinho-600',
    secondary: 'bg-preto-800 text-white border border-preto-600 hover:bg-preto-700 hover:border-vinho-500/50',
  };

  const sharedProps = {
    onClick,
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => {
      setIsHovering(false);
      mouseX.set(0);
      mouseY.set(0);
    },
    style: {
      rotateX,
      rotateY,
      scale,
      transformOrigin: 'center center',
      transformStyle: 'preserve-3d' as const,
    },
    whileTap: { scale: 0.97 },
    className: cn(
      'relative inline-flex items-center justify-center gap-2 font-medium rounded-xl',
      'transition-all duration-300 ease-spring',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vinho-500 focus-visible:ring-offset-2 focus-visible:ring-offset-preto-975',
      'overflow-hidden',
      sizeStyles[size],
      variantStyles[variant],
      className
    ),
  };

  if (href) {
    return (
      <motion.a
        ref={anchorRef}
        {...sharedProps}
        href={href}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-vinho-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{ opacity: isHovering ? 1 : 0 }}
        />

        <span className="relative z-10 flex items-center gap-2">
          {icon && iconPosition === 'left' && (
            <motion.span
              animate={{ x: isHovering ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <motion.span
              animate={{ x: isHovering ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.span>
          )}
        </span>

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-vinho-500 via-vinho-600 to-vinho-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{ opacity: isHovering ? 1 : 0 }}
        />
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      {...sharedProps}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-vinho-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{ opacity: isHovering ? 1 : 0 }}
      />

      <span className="relative z-10 flex items-center gap-2">
        {icon && iconPosition === 'left' && (
          <motion.span
            animate={{ x: isHovering ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <motion.span
            animate={{ x: isHovering ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.span>
        )}
      </span>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-vinho-500 via-vinho-600 to-vinho-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{ opacity: isHovering ? 1 : 0 }}
      />
    </motion.button>
  );
}