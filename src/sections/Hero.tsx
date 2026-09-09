import { motion } from 'framer-motion';
import { ArrowRight, MousePointer } from 'lucide-react';
import { Button } from '../components/Button';
import LiquidChrome from '../components/ui/LiquidChrome';
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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <LiquidChrome
          baseColor={[0.2235294117647059, 0.03137254901960784, 0.06274509803921569]}
          speed={1}
          amplitude={0.6}
          interactive={false}
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-preto-975/80 via-preto-975/50 to-preto-975/70 pointer-events-none"
        aria-hidden="true"
      />

      {!reducedMotion && (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-vinho-500/10 rounded-full blur-3xl animate-float lg:w-[300px] lg:h-[300px]" aria-hidden="true" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-vinho-600/10 rounded-full blur-3xl animate-float lg:w-[250px] lg:h-[250px]" style={{ animationDelay: '2s' }} aria-hidden="true" />
        </>
      )}

      <div className="container relative z-10 px-4 py-20 pb-32 sm:px-6 lg:px-8 lg:py-28 lg:pb-36">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease: 'easeOut' }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vinho-500/10 border border-vinho-500/20 text-vinho-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vinho-400 opacity-75" aria-hidden="true" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-vinho-500" aria-hidden="true" />
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
            className="text-lg sm:text-xl lg:text-2xl text-neutral-300 max-w-3xl mx-auto mb-4 font-medium"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: 0.3, ease: 'easeOut' }}
            className="text-neutral-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 lg:mb-12"
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
            className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 px-2 text-center text-neutral-500 text-sm sm:mt-16"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vinho-500" aria-hidden="true" />
              <span>HTML • CSS • JavaScript</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vinho-500" aria-hidden="true" />
              <span>PHP • Laravel • MySQL</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vinho-500" aria-hidden="true" />
              <span>Git • GitHub</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 1, delay: 0.8, ease: 'easeOut' }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 sm:bottom-6 lg:bottom-10"
          aria-hidden="true"
        >
          <span className="text-xs uppercase tracking-wider">Role para baixo</span>
          <motion.div
            animate={{ y: reducedMotion ? 0 : [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-preto-700 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-bounce" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}