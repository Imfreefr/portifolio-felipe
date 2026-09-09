import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import './Carousel.css';

export interface CarouselItem {
  id: string | number;
  title: string;
  description: string;
  icon: ReactNode;
}

interface CarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
}

export default function Carousel({ items, autoplay = false, autoplayDelay = 3000, pauseOnHover = false }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentItem = items[activeIndex];

  useEffect(() => {
    const handleVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const next = useCallback(() => setActiveIndex((index) => (index + 1) % items.length), [items.length]);
  const previous = useCallback(() => setActiveIndex((index) => (index - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (!autoplay || isPaused || !isVisible || !pageVisible || items.length < 2) return;
    const timer = window.setInterval(next, autoplayDelay);
    return () => window.clearInterval(timer);
  }, [autoplay, autoplayDelay, isPaused, isVisible, pageVisible, items.length, next]);

  const itemKey = useMemo(() => `${currentItem.id}-${activeIndex}`, [currentItem.id, activeIndex]);

  if (!currentItem) return null;

  return (
    <div
      ref={containerRef}
      className="carousel-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.article
          key={itemKey}
          className="carousel-card"
          initial={{ opacity: 0, x: 30, rotateY: 8 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          exit={{ opacity: 0, x: -30, rotateY: -8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="carousel-card-icon">{currentItem.icon}</div>
          <div>
            <p className="carousel-card-index">{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</p>
            <h3>{currentItem.title}</h3>
            <p>{currentItem.description}</p>
          </div>
        </motion.article>
      </AnimatePresence>
      <div className="carousel-controls">
        <button type="button" onClick={previous} aria-label="Item anterior">←</button>
        <div className="carousel-dots" role="tablist" aria-label="Itens do carrossel">
          {items.map((item, index) => (
            <button key={item.id} type="button" className={index === activeIndex ? 'active' : ''} onClick={() => setActiveIndex(index)} aria-label={`Mostrar ${item.title}`} aria-selected={index === activeIndex} role="tab" />
          ))}
        </div>
        <button type="button" onClick={next} aria-label="Próximo item">→</button>
      </div>
    </div>
  );
}