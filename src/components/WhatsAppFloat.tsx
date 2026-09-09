import { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWhatsAppUrl } from '../utils/helpers';
import { personalInfo } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useIntersectionObserver';
import { cn } from '../utils/helpers';

type MessageKey = keyof typeof personalInfo.whatsapp.messages;

interface WhatsAppFloatProps {
  defaultMessage?: MessageKey;
}

export function WhatsAppFloat({ defaultMessage = 'contato' }: WhatsAppFloatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 100;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (Math.abs(currentScrollY - lastScrollY) > 50 && isOpen) {
        setIsOpen(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const messages: { key: MessageKey; label: string }[] = [
    { key: 'orcamento', label: 'Solicitar orçamento' },
    { key: 'desenvolvimento', label: 'Desenvolvimento web' },
    { key: 'contato', label: 'Conversar' },
  ];

  const handleMessageClick = (messageKey: MessageKey) => {
    window.open(getWhatsAppUrl(personalInfo.whatsapp.messages[messageKey]), '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50" aria-label="WhatsApp">
      <AnimatePresence>
        {isOpen && !reducedMotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-16 right-0 w-64"
          >
            <div className="bg-preto-900 border border-preto-700 rounded-xl p-4 shadow-card-hover">
              <p className="text-sm font-medium text-white mb-3">Como posso ajudar?</p>
              <div className="space-y-2">
                {messages.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => handleMessageClick(key)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-neutral-300 hover:bg-preto-800 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {isOpen && reducedMotion && (
          <div className="absolute bottom-16 right-0 w-64">
            <div className="bg-preto-900 border border-preto-700 rounded-xl p-4 shadow-card-hover">
              <p className="text-sm font-medium text-white mb-3">Como posso ajudar?</p>
              <div className="space-y-2">
                {messages.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => handleMessageClick(key)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-neutral-300 hover:bg-preto-800 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative flex items-center justify-center w-14 h-14 rounded-full',
          'bg-emerald-500 text-white',
          'shadow-lg shadow-emerald-500/25',
          'transition-all duration-300',
          'hover:scale-110 hover:shadow-xl hover:shadow-emerald-500/40',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-preto-975'
        )}
        aria-label={isOpen ? 'Fechar opções do WhatsApp' : 'Abrir WhatsApp'}
        aria-expanded={isOpen}
        whileHover={{ scale: reducedMotion ? 1 : 1.1 }}
        whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
            >
              <MessageSquare className="w-7 h-7" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>

        {!reducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-full bg-emerald-500 opacity-30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        )}
      </motion.button>
    </div>
  );
}