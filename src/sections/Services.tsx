import { motion } from 'framer-motion';
import {
  Globe,
  Target,
  Building,
  Database,
  Layout,
  Server,
  Palette,
  Cpu,
} from 'lucide-react';
import { Section, SectionHeader } from '../components/Section';
import { services } from '../data/portfolio';
import { useReducedMotion, useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { assetPath, cn } from '../utils/helpers';
import { recursosVisuais } from '../data/portfolio';

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Target,
  Building,
  Database,
  Layout,
  Server,
  Palette,
  Cpu,
};

export function Services() {
  const reducedMotion = useReducedMotion();
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <Section
      ref={ref}
      id="servicos"
      size="lg"
      background="grid"
      aria-labelledby="services-title"
    >
      <SectionHeader
        title="Serviços"
        subtitle="Soluções digitais completas para transformar sua presença online e impulsionar seu negócio."
        align="center"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasIntersected ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        role="list"
        aria-label="Lista de serviços oferecidos"
      >
        {services.map((service, index) => {
          const Icon = serviceIcons[service.icon] || Globe;

          return (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 30, scale: hasIntersected ? 1 : 0.95 }}
              transition={{
                duration: reducedMotion ? 0 : 0.6,
                delay: reducedMotion ? 0 : 0.1 + index * 0.08,
                ease: 'easeOut',
              }}
              className={cn(
                'card-hover group p-6 relative overflow-hidden',
                'bg-preto-900/80 border-preto-700'
              )}
              role="listitem"
              whileHover={{ y: reducedMotion ? 0 : -4 }}
            >
              <img
                src={assetPath(recursosVisuais.services[0])}
                alt="Interface digital abstrata representando soluções web"
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
                className="absolute inset-x-0 top-0 h-32 w-full object-cover opacity-25 transition-opacity duration-500 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-preto-900/20 via-preto-900/80 to-preto-900/95" aria-hidden="true" />
              <div className="relative z-10 space-y-4 pt-24">
                <div className="w-12 h-12 rounded-xl bg-vinho-500/10 group-hover:bg-vinho-500/20 transition-colors flex items-center justify-center">
                  <Icon className="w-6 h-6 text-vinho-400 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                </div>

                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-preto-800 border border-preto-600 text-xs font-medium text-vinho-400 mb-2">
                    {service.category}
                  </span>
                  <h3 className="text-xl font-semibold text-white group-hover:text-vinho-400 transition-colors">
                    {service.title}
                  </h3>
                </div>

                <p className="text-neutral-400 leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-2 border-t border-preto-700/50 flex items-center gap-2 text-vinho-500 font-medium text-sm group-hover:gap-3 transition-all">
                  <span>Saiba mais</span>
                  <motion.span
                    animate={{ x: reducedMotion ? 0 : [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    aria-hidden="true"
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 20 }}
        transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.5, ease: 'easeOut' }}
        className="mt-16 text-center"
      >
        <p className="text-neutral-400 mb-4">Precisa de algo personalizado?</p>
        <a
          href="#contato"
          className="inline-flex items-center gap-2 text-vinho-500 hover:text-vinho-400 font-medium transition-colors"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Vamos conversar sobre seu projeto
          <motion.span
            animate={{ x: reducedMotion ? 0 : [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            aria-hidden="true"
          >
            →
          </motion.span>
        </a>
      </motion.div>
    </Section>
  );
}