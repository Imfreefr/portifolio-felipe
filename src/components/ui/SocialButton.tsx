'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

interface SocialButtonProps {
  href: string;
  label: string;
  username?: string;
  icon: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal';
  target?: '_blank' | '_self';
  rel?: string;
}

export function SocialButton({
  href,
  label,
  username,
  icon,
  className,
  size = 'md',
  variant = 'default',
  target = '_blank',
  rel = 'noopener noreferrer',
}: SocialButtonProps) {
  const sizeStyles = {
    sm: 'px-3 py-2 text-xs gap-2',
    md: 'px-4 py-2.5 text-sm gap-2.5',
    lg: 'px-5 py-3 text-base gap-3',
  };

  const variantStyles = {
    default: 'bg-preto-800 border border-preto-600 hover:bg-preto-700 hover:border-vinho-500/50',
    minimal: 'bg-transparent border-none hover:bg-preto-800/50',
  };

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-xl',
        'transition-all duration-300 ease-spring',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vinho-500 focus-visible:ring-offset-2 focus-visible:ring-offset-preto-975',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      whileHover={{ 
        scale: 1.02,
        y: -2,
      }}
      whileTap={{ scale: 0.98 }}
      aria-label={username ? `${label}: ${username}` : label}
    >
      <span className="flex items-center justify-center w-5 h-5 flex-shrink-0" aria-hidden="true">
        {icon}
      </span>
      <span className="hidden sm:inline">{label}</span>
      {username && variant === 'default' && (
        <span className="text-neutral-500 hidden sm:inline">@{username}</span>
      )}
    </motion.a>
  );
}

export function SocialButtonsGroup({
  children,
  className,
  gap = 3,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <div className={cn('flex flex-wrap items-center', `gap-${gap}`, className)}>
      {children}
    </div>
  );
}