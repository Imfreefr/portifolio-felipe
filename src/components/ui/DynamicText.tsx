'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useIntersectionObserver';
import { cn } from '../../utils/helpers';

interface DynamicTextProps {
  texts: string[];
  className?: string;
  interval?: number;
  transitionDuration?: number;
  prefix?: string;
  suffix?: string;
  cursor?: boolean;
  cursorChar?: string;
}

export function DynamicText({
  texts,
  className,
  interval = 3000,
  transitionDuration = 500,
  prefix = '',
  suffix = '',
  cursor = true,
  cursorChar = '|',
}: DynamicTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);
  const reducedMotion = useReducedMotion();
  const timeoutRef = useRef<number | null>(null);
  const textsLength = texts.length;

  const currentText = texts[currentIndex];

  const tick = () => {
    if (isDeleting) {
      setDisplayText(prev => prev.slice(0, -1));
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex(prev => (prev + 1) % textsLength);
      }
    } else {
      setDisplayText(prev => currentText.slice(0, prev.length + 1));
      if (displayText === currentText) {
        setIsDeleting(true);
      }
    }
  };

  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(currentText);
      return;
    }

    const typeSpeed = 80;
    const deleteSpeed = 40;

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    timeoutRef.current = window.setTimeout(tick, speed);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, currentText, reducedMotion, textsLength]);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(currentText);
      setIsDeleting(false);
    }
  }, [reducedMotion, currentText]);

  return (
    <span className={cn('inline-flex items-center', className)}>
      {prefix && <span className="mr-2">{prefix}</span>}
      <span className="relative">
        {displayText}
        {cursor && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="ml-1 inline-block align-bottom"
            aria-hidden="true"
          >
            {cursorChar}
          </motion.span>
        )}
      </span>
      {suffix && <span className="ml-2">{suffix}</span>}
    </span>
  );
}

export function DynamicTextLoop({
  texts,
  className,
  interval = 3000,
  transitionDuration = 500,
  prefix = '',
  suffix = '',
}: {
  texts: string[];
  className?: string;
  interval?: number;
  transitionDuration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const reducedMotion = useReducedMotion();
  const textsLength = texts.length;

  useEffect(() => {
    if (reducedMotion) return;

    const timer = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % textsLength);
        setOpacity(1);
      }, transitionDuration / 2);
    }, interval);

    return () => clearInterval(timer);
  }, [textsLength, interval, transitionDuration, reducedMotion]);

  return (
    <span className={cn('inline-flex items-center', className)}>
      {prefix && <span className="mr-2">{prefix}</span>}
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: transitionDuration / 1000 }}
      >
        {texts[currentIndex]}
      </motion.span>
      {suffix && <span className="ml-2">{suffix}</span>}
    </span>
  );
}