import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Zap, Code2, Palette, Users, Clock, Globe, Layers, Award } from 'lucide-react';
import { Section, SectionHeader } from '../components/Section';
import { differentials } from '../data/portfolio';
import { useReducedMotion, useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { cn } from '../utils/helpers';

const differentialIcons = [
  Award,
  Shield,
  Zap,
  Code2,
  Palette,
  Users,
  Clock,
  Globe,
  Layers,
  CheckCircle2,
];

export function Differentials() {
  const reducedMotion = useReducedMotion();
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <Section
      ref={ref}
      id="diferenciais"
      size="lg"
      background="grid"
      aria-labelledby="differentials-title"
    >
      <SectionHeader
        title="Por que trabalhar comigo?"
        subtitle="Diferenciais que fazem a diferença na entrega do seu projeto."
        align="center"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasIntersected ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        role="list"
        aria-label="Diferenciais competitivos"
      >
        {differentials.map((differential, index) => {
          const Icon = differentialIcons[index % differentialIcons.length];

          return (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{
                opacity: hasIntersected ? 1 : 0,
                y: hasIntersected ? 0 : 30,
                scale: hasIntersected ? 1 : 0.95,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.6,
                delay: reducedMotion ? 0 : 0.1 + index * 0.07,
                ease: 'easeOut',
              }}
              className={cn(
                'card-hover group p-6 relative overflow-hidden',
                'bg-dark-900/80 border-dark-700'
              )}
              role="listitem"
              whileHover={{ y: reducedMotion ? 0 : -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

              <div className="relative z-10 flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-500 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-dark-300 leading-relaxed group-hover:text-white transition-colors">
                    {differential}
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="flex-shrink-0 w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 20 }}
        transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.5, ease: 'easeOut' }}
        className="mt-16"
      >
        <div className="bg-dark-900/60 backdrop-blur-sm border border-dark-700 rounded-2xl p-8 lg:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.5, delay: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" aria-hidden="true" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" aria-hidden="true" />
              </span>
              <span className="text-primary-400 font-medium">Compromisso com qualidade e entrega</span>
            </motion.div>

            <p className="text-dark-400 text-lg leading-relaxed mb-8">
              Cada projeto é tratado com dedicação exclusiva. Não utilizo templates prontos, 
              não entrego código genérico. Seu projeto merece uma solução pensada do zero, 
              com arquitetura limpa, design intencional e código que escala.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-dark-400">
                <span className="w-2 h-2 rounded-full bg-primary-500" aria-hidden="true" />
                <span>Código limpo & documentado</span>
              </div>
              <div className="flex items-center gap-2 text-dark-400">
                <span className="w-2 h-2 rounded-full bg-accent-500" aria-hidden="true" />
                <span>Testes & validação</span>
              </div>
              <div className="flex items-center gap-2 text-dark-400">
                <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
                <span>Suporte pós-entrega</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}