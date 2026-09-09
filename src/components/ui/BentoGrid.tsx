'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

interface BentoGridItem {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
}

interface BentoGridProps {
  items: BentoGridItem[];
  className?: string;
  columns?: { base: number; sm: number; md: number; lg: number; xl: number };
  gap?: number;
  reducedMotion?: boolean;
}

export function BentoGrid({ 
  items, 
  className, 
  columns = { base: 1, sm: 2, md: 3, lg: 4, xl: 4 },
  gap = 4,
  reducedMotion = false 
}: BentoGridProps) {
  const gridCols = `
    grid-cols-${columns.base}
    sm:grid-cols-${columns.sm}
    md:grid-cols-${columns.md}
    lg:grid-cols-${columns.lg}
    xl:grid-cols-${columns.xl}
  `;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.5 }}
      className={cn(
        'grid',
        gridCols,
        `gap-${gap}`,
        className
      )}
      role="list"
    >
      {items.map((item, index) => {
        const hasColSpan = typeof item.colSpan === 'number' && item.colSpan > 0;
        const hasRowSpan = typeof item.rowSpan === 'number' && item.rowSpan > 0;
        const colSpan = hasColSpan ? item.colSpan : undefined;
        const rowSpan = hasRowSpan ? item.rowSpan : undefined;
        
        return (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: reducedMotion ? 0 : 0.5,
              delay: reducedMotion ? 0 : 0.1 + index * 0.08,
              ease: 'easeOut',
            }}
            className={cn(
              'relative overflow-hidden rounded-2xl bg-preto-900/60 backdrop-blur-sm border border-preto-700',
              'card-hover group',
              colSpan ? `col-span-${colSpan}` : undefined,
              rowSpan ? `row-span-${rowSpan}` : undefined,
              item.className
            )}
            role="listitem"
            whileHover={{ y: reducedMotion ? 0 : -4 }}
          >
            {item.children}
          </motion.article>
        );
      })}
    </motion.div>
  );
}

export function BentoCard({ 
  children, 
  className, 
  hover = true,
  padding = 'md',
  ...props 
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  [key: string]: unknown;
}) {
  const paddingStyles: Record<string, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-6 lg:p-8',
    lg: 'p-8 lg:p-10',
    xl: 'p-10 lg:p-12',
  };

  return (
    <div 
      className={cn(
        'relative z-10 h-full flex flex-col',
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}