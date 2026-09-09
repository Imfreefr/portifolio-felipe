'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { cn } from '../../utils/helpers';

interface SwitchButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SwitchButton({ className, size = 'md' }: SwitchButtonProps) {
  const { theme, toggleTheme } = useTheme();

  const sizeStyles = {
    sm: 'w-9 h-5',
    md: 'w-11 h-6',
    lg: 'w-14 h-7',
  };

  const thumbSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const thumbTranslate = {
    sm: { dark: 'translate-x-5', light: 'translate-x-0' },
    md: { dark: 'translate-x-5', light: 'translate-x-0' },
    lg: { dark: 'translate-x-7', light: 'translate-x-0' },
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center justify-between rounded-full bg-preto-800 border border-preto-600 p-0.5 transition-all duration-300 ease-spring',
        'hover:border-vinho-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vinho-500 focus-visible:ring-offset-2 focus-visible:ring-offset-preto-975',
        sizeStyles[size],
        className
      )}
      whileTap={{ scale: 0.95 }}
      aria-label={theme === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
      aria-pressed={theme === 'dark'}
    >
      <motion.div
        className={cn(
          'flex items-center justify-center z-10 transition-colors duration-300',
          thumbSize[size],
          'rounded-full bg-white shadow-lg',
          theme === 'dark' ? 'text-vinho-500' : 'text-amber-500'
        )}
        animate={{
          x: theme === 'dark' ? (size === 'lg' ? 56 : size === 'sm' ? 28 : 32) : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {theme === 'dark' ? (
          <Moon className="w-full h-full" aria-hidden="true" />
        ) : (
          <Sun className="w-full h-full" aria-hidden="true" />
        )}
      </motion.div>

      <span
        className={cn(
          'absolute text-xs font-medium transition-opacity duration-200 pointer-events-none',
          theme === 'dark'
            ? 'right-2 opacity-100 text-vinho-400'
            : 'left-2 opacity-0 text-neutral-500'
        )}
        aria-hidden="true"
      >
        {theme === 'dark' ? 'Escuro' : 'Claro'}
      </span>

      <span
        className={cn(
          'absolute text-xs font-medium transition-opacity duration-200 pointer-events-none',
          theme === 'light'
            ? 'left-2 opacity-100 text-amber-500'
            : 'right-2 opacity-0 text-neutral-500'
        )}
        aria-hidden="true"
      >
        {theme === 'light' ? 'Claro' : 'Escuro'}
      </span>
    </motion.button>
  );
}