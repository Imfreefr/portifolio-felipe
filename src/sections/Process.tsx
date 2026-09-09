import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ClipboardList, Code2, MessageSquare, PenTool, Rocket } from 'lucide-react';
import { Section, SectionHeader } from '../components/Section';
import { processSteps } from '../data/portfolio';
import { useReducedMotion, useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { cn } from '../utils/helpers';

const stepIcons = [MessageSquare, ClipboardList, PenTool, Code2, CheckCircle2, Rocket];
const stepAccents = ['#d94a5f', '#e67280', '#26b99a', '#f97316', '#2dd4bf', '#d94a5f'];

export function Process() {
  const reducedMotion = useReducedMotion();
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.12 });

  return (
    <Section ref={ref} id="processo" size="lg" background="radial" aria-labelledby="process-title">
      <SectionHeader
        title="Processo de Trabalho"
        subtitle="Uma jornada clara, colaborativa e orientada a resultados para transformar sua ideia em uma solução digital completa."
        align="center"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 24 }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="mb-8 grid gap-4 rounded-3xl border border-vinho-500/20 bg-preto-900/60 p-5 sm:p-7 lg:grid-cols-[1.4fr_.6fr] lg:p-8"
        >
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.2em] text-vinho-400">Do primeiro contato à entrega</p>
            <h3 className="max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-3xl">Cada etapa tem um propósito e você acompanha tudo de perto.</h3>
          </div>
          <div className="flex items-end lg:justify-end">
            <div className="rounded-2xl border border-preto-700 bg-preto-950/70 px-4 py-3 text-sm text-neutral-300">
              <span className="block text-2xl font-bold text-vinho-400">06</span>
              etapas organizadas
            </div>
          </div>
        </motion.div>

        <div className="relative grid gap-4 md:grid-cols-2" role="list" aria-label="Etapas do processo de desenvolvimento">
          <div className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-vinho-500/50 via-vinho-500/15 to-transparent md:block" aria-hidden="true" />
          {processSteps.map((step, index) => {
            const Icon = stepIcons[index];
            const accent = stepAccents[index];
            return (
              <motion.article
                key={step.step}
                role="listitem"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 24 }}
                transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : index * 0.08 }}
                whileHover={{ y: reducedMotion ? 0 : -4 }}
                className={cn('group relative overflow-hidden rounded-2xl border border-preto-700 bg-preto-900/75 p-5 shadow-lg shadow-black/10 sm:p-6', index === 0 ? 'md:col-span-2' : '')}
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-50" style={{ backgroundColor: accent }} aria-hidden="true" />
                <div className="relative z-10 flex items-start gap-4 sm:gap-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10" style={{ backgroundColor: `${accent}22`, color: accent }}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="font-mono text-xs font-bold tracking-widest" style={{ color: accent }}>{step.step}</span>
                      <h3 className="text-lg font-bold text-white sm:text-xl">{step.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">{step.description}</p>
                  </div>
                  <ArrowRight className="mt-1 hidden h-5 w-5 flex-shrink-0 text-vinho-400 opacity-0 transition-opacity group-hover:opacity-100 sm:block" aria-hidden="true" />
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 16 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, delay: 0.5 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-vinho-500/25 bg-vinho-500/10 p-5 text-center sm:flex-row sm:p-6 sm:text-left"
        >
          <div className="flex items-center gap-3">
            <Rocket className="h-5 w-5 flex-shrink-0 text-vinho-400" aria-hidden="true" />
            <span className="font-medium text-neutral-200">Pronto para começar? Vamos conversar sobre seu projeto.</span>
          </div>
          <a href="#contato" className="inline-flex items-center gap-2 font-semibold text-vinho-400 transition-colors hover:text-vinho-300" onClick={(event) => { event.preventDefault(); document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Entrar em contato
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </Section>
  );
}