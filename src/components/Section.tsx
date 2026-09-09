import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/helpers';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  background?: 'none' | 'grid' | 'radial' | 'mesh';
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      className,
      children,
      size = 'lg',
      background = 'none',
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'py-12 lg:py-16',
      md: 'py-16 lg:py-20',
      lg: 'py-20 lg:py-28',
      xl: 'py-24 lg:py-32 xl:py-40',
      full: 'min-h-screen flex items-center justify-center',
    };

    const backgroundStyles = {
      none: '',
      grid: 'relative before:absolute before:inset-0 before:bg-grid-pattern before:bg-grid before:opacity-50',
      radial: 'relative before:absolute before:inset-0 before:bg-radial-glow',
      mesh: 'relative before:absolute before:inset-0 before:bg-mesh-gradient',
    };

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          'relative z-10 w-full',
          sizeStyles[size],
          backgroundStyles[background],
          className
        )}
        {...props}
      >
        <div className="container relative z-10">
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';

export const SectionHeader = ({
  title,
  subtitle,
  align = 'left',
  className,
  children,
}: {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  children?: React.ReactNode;
}) => {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const maxWidthStyles = {
    left: 'max-w-2xl',
    center: 'max-w-3xl mx-auto',
    right: 'max-w-2xl ml-auto',
  };

  return (
    <div className={cn('mb-12 lg:mb-16', alignStyles[align], className)}>
      {children || (
        <>
          <h2 className={cn('section-title', maxWidthStyles[align])}>{title}</h2>
          {subtitle && (
            <p className={cn('section-subtitle mt-4', maxWidthStyles[align])}>
              {subtitle}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export const Container = ({
  children,
  className,
  size = 'full',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'full' | 'narrow' | 'wide';
}) => {
  const sizeStyles = {
    full: 'max-w-7xl',
    narrow: 'max-w-3xl',
    wide: 'max-w-8xl',
  };

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizeStyles[size], className)}>
      {children}
    </div>
  );
};