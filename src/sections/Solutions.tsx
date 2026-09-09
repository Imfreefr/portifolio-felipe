import { motion } from 'framer-motion';
import { Section, SectionHeader } from '../components/Section';
import { OptionWheel } from '../components/ui/OptionWheel';
import { solutionTypes } from '../data/portfolio';
import { useReducedMotion, useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { cn } from '../utils/helpers';

export function Solutions() {
  const reducedMotion = useReducedMotion();
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <Section
      ref={ref}
      id="solucoes"
      size="lg"
      background="grid"
      aria-labelledby="solutions-title"
    >
      <SectionHeader
        title="O que podemos criar?"
        subtitle="Tipos de soluções digitais que desenvolvo. Selecione uma opção para saber mais e conversar sobre seu projeto."
        align="center"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 30 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: 'easeOut' }}
        className="max-w-3xl mx-auto"
      >
        <OptionWheel
          options={solutionTypes.map(st => ({
            id: st.id,
            title: st.title,
            description: st.description,
            icon: st.icon,
            category: st.category,
          }))}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 20 }}
        transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.5, ease: 'easeOut' }}
        className="mt-16 text-center"
      >
        <p className="text-neutral-400 mb-4">
          Não encontrou o que procura? Cada projeto é único.
        </p>
        <p className="text-neutral-500 text-sm mb-6">
          Vamos conversar sobre sua necessidade específica.
        </p>
        <a
          href="#contato"
          className="inline-flex items-center gap-2 text-vinho-500 hover:text-vinho-400 font-medium transition-colors"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Falar sobre seu projeto personalizado
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