import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useActiveSection, useReducedMotion, useMediaQuery } from '../hooks/useIntersectionObserver';
import { scrollToSection } from '../utils/helpers';
import { cn } from '../utils/helpers';
import { Button } from './Button';

const navItems = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'tecnologias', label: 'Tecnologias' },
  { id: 'diferenciais', label: 'Diferenciais' },
  { id: 'formacao', label: 'Formação' },
  { id: 'processo', label: 'Processo' },
  { id: 'contato', label: 'Contato' },
  { id: 'solucoes', label: 'Soluções' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(navItems.map(item => item.id));
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 1023px)');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleCtaClick = (messageKey: 'orcamento' | 'desenvolvimento' | 'contato') => {
    const messages = {
      orcamento: 'Olá Felipe! Vi seu portfólio e gostaria de solicitar um orçamento para um projeto.',
      desenvolvimento: 'Olá Felipe! Gostaria de conversar sobre o desenvolvimento de um site ou sistema.',
      contato: 'Olá Felipe! Vi seu portfólio e gostaria de conversar com você.',
    };
    window.open(`https://wa.me/5571982191577?text=${encodeURIComponent(messages[messageKey])}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-preto-950/90 backdrop-blur-md border-b border-preto-800 shadow-lg'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navegação principal">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className="flex items-center gap-2 text-white font-bold text-xl lg:text-2xl z-10"
            aria-label="Felipe Souza Nascimento - Início"
            whileHover={{ scale: reducedMotion ? 1 : 1.02 }}
            whileTap={{ scale: reducedMotion ? 1 : 0.98 }}
          >
            <img 
              src="/imgs/noctra-simbolo-branco-transparente.png" 
              alt="Noctra" 
              className="w-7 h-7"
            />
          </motion.a>

          <div className={cn('hidden lg:flex items-center gap-8', isMobile ? 'absolute top-full left-0 right-0 bg-preto-950/95 backdrop-blur-md border-b border-preto-800 py-6 px-6 flex-col gap-4' : '')}>
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors',
                  'hover:text-vinho-400',
                  activeSection === item.id
                    ? 'text-vinho-400'
                    : 'text-neutral-300 hover:text-white'
                )}
                whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
                whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-vinho-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
              </motion.button>
            ))}

            <div className="flex items-center gap-3 pt-2 lg:pt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCtaClick('desenvolvimento')}
                className="hidden lg:inline-flex"
              >
                Desenvolvimento
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleCtaClick('orcamento')}
              >
                Orçamento
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleCtaClick('orcamento')}
            >
              Orçamento
            </Button>
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-preto-800 transition-colors"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
              whileHover={{ scale: reducedMotion ? 1 : 1.1 }}
              whileTap={{ scale: reducedMotion ? 1 : 0.9 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.3, ease: 'easeInOut' }}
              className="absolute top-full left-0 right-0 bg-preto-950/95 backdrop-blur-md border-b border-preto-800 py-6 px-6 flex flex-col gap-4"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    'w-full px-4 py-3 text-left text-base font-medium rounded-lg transition-colors',
                    'hover:bg-preto-800',
                    activeSection === item.id
                      ? 'bg-vinho-500/10 text-vinho-400'
                      : 'text-neutral-300 hover:text-white'
                  )}
                  whileHover={{ x: reducedMotion ? 0 : 4 }}
                  whileTap={{ scale: reducedMotion ? 1 : 0.98 }}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </motion.button>
              ))}

              <div className="flex flex-col gap-3 pt-4 border-t border-preto-800">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleCtaClick('desenvolvimento')}
                >
                  Desenvolvimento
                </Button>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => handleCtaClick('orcamento')}
                >
                  Solicitar Orçamento
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}