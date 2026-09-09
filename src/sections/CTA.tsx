import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { getWhatsAppUrl } from '../utils/helpers';
import { personalInfo } from '../data/portfolio';
import { useReducedMotion, useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { cn } from '../utils/helpers';

export function CTA() {
  const reducedMotion = useReducedMotion();
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  const handleClick = () => {
    window.open(
      getWhatsAppUrl(personalInfo.whatsapp.messages.contato),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <Section
      ref={ref}
      id="cta"
      size="lg"
      background="mesh"
      aria-labelledby="cta-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: hasIntersected ? 1 : 0, scale: hasIntersected ? 1 : 0.95 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: 'easeOut' }}
        className="relative max-w-4xl mx-auto text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-accent-500/10 rounded-3xl blur-3xl" aria-hidden="true" />
        
        {!reducedMotion && (
          <>
            <div className="absolute -top-8 -left-8 w-24 h-24 border-2 border-primary-500/30 rounded-full animate-pulse" aria-hidden="true" />
            <div className="absolute -bottom-8 -right-8 w-16 h-16 border-2 border-accent-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} aria-hidden="true" />
          </>
        )}

        <div className="relative z-10 px-6 lg:px-12 py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.1, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span>Vamos transformar sua ideia em realidade</span>
          </motion.div>

          <motion.h2
            id="cta-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-tight mb-6 leading-[1.15]"
          >
            Tem uma ideia? Vamos transformar em realidade.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.3, ease: 'easeOut' }}
            className="text-dark-300 text-lg lg:text-xl max-w-2xl mx-auto mb-10"
          >
            Conte um pouco sobre o seu projeto e vamos conversar sobre a melhor solução. 
            Sem compromisso, apenas uma conversa para entender suas necessidades.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleClick}
              rightIcon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
              className="group"
            >
              <MessageSquare className="w-5 h-5 mr-1 -ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              Falar comigo no WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Outras formas de contato
              <ArrowRight className="w-5 h-5 ml-1" aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.5, ease: 'easeOut' }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-dark-500"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
              <span>Resposta em até 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-500" aria-hidden="true" />
              <span>Orçamento sem compromisso</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-500" aria-hidden="true" />
              <span>Projetos personalizados</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}