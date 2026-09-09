import { motion } from 'framer-motion';
import { MessageSquare, ClipboardList, PenTool, Code2, CheckCircle2, Rocket, ArrowRight } from 'lucide-react';
import { Section, SectionHeader } from '../components/Section';
import { processSteps } from '../data/portfolio';
import { useReducedMotion, useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { cn } from '../utils/helpers';

const stepIcons = [MessageSquare, ClipboardList, PenTool, Code2, CheckCircle2, Rocket];
const stepColors = [
  'from-vinho-500 to-vinho-600',
  'from-vinho-500 to-rose-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-red-500',
  'from-emerald-500 to-teal-500',
  'from-vinho-500 to-vinho-600',
];

export function Process() {
  const reducedMotion = useReducedMotion();
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <Section
      ref={ref}
      id="processo"
      size="lg"
      background="grid"
      aria-labelledby="process-title"
    >
      <SectionHeader
        title="Processo de Trabalho"
        subtitle="Como transformo sua ideia em uma solução digital completa, do conceito à entrega."
        align="center"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasIntersected ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.5 }}
        className="relative max-w-4xl mx-auto"
      >
        <div className="absolute left-4 lg:left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-vinho-500/50 via-transparent to-transparent" aria-hidden="true" />

        <div className="space-y-12 lg:space-y-16" role="list" aria-label="Etapas do processo de desenvolvimento">
          {processSteps.map((step, index) => {
            const Icon = stepIcons[index];
            const color = stepColors[index];

            return (
              <motion.article
                key={step.step}
                initial={{ opacity: 0, x: -40 }}
                animate={{
                  opacity: hasIntersected ? 1 : 0,
                  x: hasIntersected ? 0 : -40,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.7,
                  delay: reducedMotion ? 0 : 0.1 + index * 0.1,
                  ease: 'easeOut',
                }}
                className="relative timeline-item"
                role="listitem"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: hasIntersected ? 1 : 0, opacity: hasIntersected ? 1 : 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.5,
                    delay: reducedMotion ? 0 : 0.3 + index * 0.1,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="timeline-dot"
                  style={{ boxShadow: `0 0 20px ${color.split(' ')[0].replace('from-', '')}` }}
                  aria-hidden="true"
                >
                  <span className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ background: `linear-gradient(135deg, ${color})` }} aria-hidden="true" />
                </motion.div>

                <div className="bg-preto-900/60 backdrop-blur-sm border border-preto-700 rounded-2xl p-6 lg:p-8 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent via-[${color.split(' ')[0].replace('from-', '')}]/10 to-transparent rounded-tr-2xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

                  <div className="relative z-10 flex items-start gap-6">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color})` }}>
                      <div className="absolute inset-0 rounded-xl blur-lg opacity-30" style={{ background: `linear-gradient(135deg, ${color})` }} aria-hidden="true" />
                      <Icon className="w-7 h-7 text-white relative z-10" aria-hidden="true" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl lg:text-3xl font-bold text-white/10 font-mono">
                          {step.step}
                        </span>
                        <h3 className="text-xl lg:text-2xl font-bold text-white">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-neutral-400 leading-relaxed pr-4">
                        {step.description}
                      </p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: reducedMotion ? 0 : 0.4, delay: 0.4 + index * 0.1 }}
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    >
                      <ArrowRight className="w-6 h-6 text-vinho-400" />
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 20 }}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.7, ease: 'easeOut' }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-preto-900/60 border border-preto-700">
            <Rocket className="w-5 h-5 text-vinho-400" aria-hidden="true" />
            <span className="text-neutral-300 font-medium">
              Pronto para começar? Vamos conversar sobre seu projeto
            </span>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}