'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { solutionTypes } from '../../data/portfolio';
import { getWhatsAppUrl } from '../../utils/helpers';
import { personalInfo } from '../../data/portfolio';

interface OptionWheelOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

interface OptionWheelProps {
  options?: OptionWheelOption[];
  className?: string;
  placeholder?: string;
  triggerLabel?: string;
}

export function OptionWheel({
  options = solutionTypes,
  className,
  placeholder = 'Selecione o tipo de solução',
  triggerLabel = 'O que podemos criar?',
}: OptionWheelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionWheelOption | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  const rotation = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mediaQuery.matches;
    const handler = (e: MediaQueryListEvent) => { reducedMotion.current = e.matches; };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    rotation.current = isOpen ? 180 : 0;
  };

  const handleOptionClick = (option: OptionWheelOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    rotation.current = 0;
    
    const message = `Olá Felipe! Vi seu portfólio e tenho interesse em: ${option.title}. ${option.description}`;
    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    
    const optionsList = options;
    const maxIndex = optionsList.length - 1;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => Math.min(prev + 1, maxIndex));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleOptionClick(optionsList[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        rotation.current = 0;
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
          optionsRef.current && !optionsRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        rotation.current = 0;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative inline-block w-full max-w-md', className)}>
      <motion.button
        ref={triggerRef}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full px-6 py-4 rounded-xl font-medium text-left transition-all duration-300 ease-spring',
          'bg-preto-800 border border-preto-600 text-white',
          'hover:border-vinho-500/50 hover:bg-preto-700',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vinho-500 focus-visible:ring-offset-2 focus-visible:ring-offset-preto-975',
          selectedOption ? 'bg-vinho-500/10 border-vinho-500/30' : ''
        )}
        whileHover={{ y: -2, borderColor: 'rgba(217, 74, 95, 0.5)' }}
        whileTap={{ scale: 0.98 }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={triggerLabel}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-xl bg-vinho-500/10 flex items-center justify-center"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {selectedOption ? (
                <Check className="w-5 h-5 text-vinho-400" aria-hidden="true" />
              ) : (
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-5 text-vinho-400"
                  aria-hidden="true"
                >
                  <ChevronDown />
                </motion.div>
              )}
            </motion.div>
            <div className="text-left">
              <span className="text-sm font-medium text-white block truncate max-w-[200px]">
                {selectedOption ? selectedOption.title : placeholder}
              </span>
              {selectedOption && (
                <span className="text-xs text-neutral-400 block truncate max-w-[200px]">
                  {selectedOption.description}
                </span>
              )}
            </div>
          </div>
          
          <motion.div
            className="w-5 h-5 text-neutral-400 flex-shrink-0"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          >
            <ChevronDown />
          </motion.div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={optionsRef}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 z-50 mt-2 bg-preto-900/95 backdrop-blur-md border border-preto-700 rounded-xl shadow-2xl overflow-hidden"
            role="listbox"
            aria-label={triggerLabel}
          >
            <div className="max-h-96 overflow-y-auto p-2">
              {options.map((option, index) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onMouseLeave={() => setHighlightedIndex(-1)}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg text-left transition-colors',
                    'hover:bg-vinho-500/10 hover:border-l-2 hover:border-l-vinho-500',
                    highlightedIndex === index 
                      ? 'bg-vinho-500/10 border-l-2 border-l-vinho-500' 
                      : 'border-l-2 border-l-transparent'
                  )}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  role="option"
                  aria-selected={highlightedIndex === index}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-vinho-500/10 flex items-center justify-center flex-shrink-0">
                      {option.icon}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <span className="font-medium text-white block truncate">{option.title}</span>
                      <span className="text-xs text-neutral-400 block truncate">{option.description}</span>
                    </div>
                    <span className="text-vinho-400 font-medium">→</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedOption && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-4 p-4 rounded-xl bg-vinho-500/10 border border-vinho-500/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-vinho-500/20 flex items-center justify-center flex-shrink-0">
              {selectedOption.icon}
            </div>
            <div>
              <h4 className="font-semibold text-white">{selectedOption.title}</h4>
              <p className="text-neutral-400 text-sm mt-1">{selectedOption.description}</p>
              <p className="text-xs text-neutral-500 mt-2">Categoria: {selectedOption.category}</p>
            </div>
          </div>
          <motion.button
            onClick={() => setSelectedOption(null)}
            className="mt-3 text-xs text-vinho-400 hover:text-vinho-300 font-medium flex items-center gap-1"
            whileHover={{ x: -4 }}
          >
            <ChevronUp className="w-3 h-3" aria-hidden="true" />
            Limpar seleção
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}