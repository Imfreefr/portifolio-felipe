import { motion } from 'framer-motion';
import { ArrowRight, MousePointer, Code2, Terminal, Layers } from 'lucide-react';
import { Button } from '../components/Button';
import { getWhatsAppUrl } from '../utils/helpers';
import { personalInfo } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useIntersectionObserver';
import { cn } from '../utils/helpers';

interface HeroProps {
  onScrollToWork: () => void;
}

export function Hero({ onScrollToWork }: HeroProps) {
  const reducedMotion = useReducedMotion();

  const handleOrcamentoClick = () => {
    window.open(
      getWhatsAppUrl(personalInfo.whatsapp.messages.orcamento),
      '_blank',
      'noopener,noreferrer'
    );
  };

  const floatingElements = [
    { icon: Code2, delay: 0, x: -150, y: -100, size: 40, color: 'text-primary-500/30' },
    { icon: Terminal, delay: 1, x: 180, y: -50, size: 32, color: 'text-accent-500/30' },
    { icon: Layers, delay: 2, x: -180, y: 120, size: 36, color: 'text-primary-400/20' },
    { icon: Code2, delay: 3, x: 150, y: 150, size: 28, color: 'text-accent-400/20' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 bg-radial-glow" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" aria-hidden="true" />

      {!reducedMotion && (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" aria-hidden="true" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} aria-hidden="true" />
        </>
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {floatingElements.map(({ icon: Icon, delay, x, y, size, color }, index) => (
          <motion.div
            key={index}
            className={cn('absolute', color)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: reducedMotion ? 0 : [0, x > 0 ? 10 : -10, 0],
              y: reducedMotion ? 0 : [0, y > 0 ? 10 : -10, 0],
            }}
            transition={{
              delay: delay * 0.3 + 0.8,
              duration: 0.6,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            style={{ left: '50%', top: '50%', transform: `translate(${x}px, ${y}px)` }}
          >
            <Icon size={size} aria-hidden="true" />
          </motion.div>
        ))}
      </div>

      <div className="container relative z-10 py-20 lg:py-28">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease: 'easeOut' }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" aria-hidden="true" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" aria-hidden="true" />
              </span>
              Web Designer & Web Developer
            </span>
          </motion.div>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1]"
          >
            Felipe Souza Nascimento
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-lg sm:text-xl lg:text-2xl text-dark-300 max-w-3xl mx-auto mb-4 font-medium"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: 0.3, ease: 'easeOut' }}
            className="text-dark-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 lg:mb-12"
          >
            {personalInfo.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleOrcamentoClick}
              rightIcon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
            >
              Solicitar orçamento
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onScrollToWork}
              leftIcon={<MousePointer className="w-5 h-5" aria-hidden="true" />}
            >
              Conhecer meu trabalho
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: 0.6, ease: 'easeOut' }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 text-dark-500 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-500" aria-hidden="true" />
              <span>HTML • CSS • JavaScript</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-500" aria-hidden="true" />
              <span>PHP • Laravel • MySQL</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
              <span>Git • GitHub</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 1, delay: 0.8, ease: 'easeOut' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dark-500"
          aria-hidden="true"
        >
          <span className="text-xs uppercase tracking-wider">Role para baixo</span>
          <motion.div
            animate={{ y: reducedMotion ? 0 : [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-dark-600 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-dark-400 animate-bounce" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}