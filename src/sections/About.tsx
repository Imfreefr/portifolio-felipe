import { motion } from 'framer-motion';
import { Award, FileSpreadsheet, GraduationCap, Code, Brain, Target } from 'lucide-react';
import { Section, SectionHeader } from '../components/Section';
import { Card } from '../components/Card';
import { aboutText } from '../data/portfolio';
import { useReducedMotion, useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { cn } from '../utils/helpers';

const highlights = [
  { icon: GraduationCap, title: 'Formação Técnica', desc: 'Curso Técnico em Informática', color: 'text-primary-500' },
  { icon: Award, title: 'Medalha de Ouro OBR', desc: 'Olimpíada Brasileira de Robótica', color: 'text-yellow-500' },
  { icon: FileSpreadsheet, title: 'Especialista Excel', desc: 'Certificação MOS Microsoft', color: 'text-green-500' },
  { icon: Code, title: 'Desenvolvimento Web', desc: 'Sites, sistemas & interfaces', color: 'text-accent-500' },
  { icon: Brain, title: 'Pensamento Analítico', desc: 'Lógica & resolução de problemas', color: 'text-orange-500' },
  { icon: Target, title: 'Foco em UX/Qualidade', desc: 'Experiência do usuário & código limpo', color: 'text-pink-500' },
];

export function About() {
  const reducedMotion = useReducedMotion();
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <Section
      ref={ref}
      id="sobre"
      size="lg"
      background="radial"
      aria-labelledby="about-title"
    >
      <SectionHeader
        title="Sobre mim"
        subtitle="Conheça minha trajetória, formações e o que me move como profissional de tecnologia."
        align="left"
      />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: hasIntersected ? 1 : 0, x: hasIntersected ? 0 : -40 }}
            transition={{ duration: reducedMotion ? 0 : 0.7, ease: 'easeOut' }}
            className="prose prose-dark max-w-none"
          >
            <p className="text-dark-300 text-lg leading-relaxed mb-6">
              {aboutText.split('\n\n')[0]}
            </p>
            <p className="text-dark-400 leading-relaxed mb-6">
              {aboutText.split('\n\n')[1]}
            </p>
            <p className="text-dark-400 leading-relaxed">
              {aboutText.split('\n\n')[2]}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 20 }}
            transition={{ duration: reducedMotion ? 0 : 0.7, delay: 0.2, ease: 'easeOut' }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            role="list"
            aria-label="Principais competências e conquistas"
          >
            {highlights.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: hasIntersected ? 1 : 0, scale: hasIntersected ? 1 : 0.9 }}
                transition={{ duration: reducedMotion ? 0 : 0.5, delay: 0.3 + index * 0.08, ease: 'easeOut' }}
                className={cn(
                  'card-hover group p-4',
                  'bg-dark-900/60 border-dark-700'
                )}
                role="listitem"
              >
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', `${item.color}/20 group-hover:${item.color}/40 transition-colors`)}>
                  <item.icon className={cn('w-5 h-5', item.color)} aria-hidden="true" />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{item.title}</h4>
                <p className="text-dark-400 text-xs">{item.desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: hasIntersected ? 1 : 0, x: hasIntersected ? 0 : 40 }}
          transition={{ duration: reducedMotion ? 0 : 0.7, ease: 'easeOut' }}
          className="relative"
        >
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-accent-500/20 rounded-3xl blur-2xl" aria-hidden="true" />
            
            <div className="relative bg-dark-900/80 backdrop-blur-sm border border-dark-700 rounded-3xl p-8 h-full">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-dark-950/50 rounded-xl border border-dark-700">
                  <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center">
                    <Code className="w-6 h-6 text-primary-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Desenvolvimento Full-Stack</h4>
                    <p className="text-dark-400 text-sm">Front-end & Back-end com tecnologias modernas</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-dark-950/50 rounded-xl border border-dark-700">
                  <div className="w-12 h-12 rounded-lg bg-accent-500/10 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-accent-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Pensamento Computacional</h4>
                    <p className="text-dark-400 text-sm">Lógica, algoritmos e resolução de problemas</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-dark-950/50 rounded-xl border border-dark-700">
                  <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Medalha de Ouro OBR</h4>
                    <p className="text-dark-400 text-sm">Robótica, automação e competição técnica</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-dark-950/50 rounded-xl border border-dark-700">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <FileSpreadsheet className="w-6 h-6 text-green-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Certificação MOS Excel</h4>
                    <p className="text-dark-400 text-sm">Produtividade avançada e análise de dados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!reducedMotion && (
            <>
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary-500/30 rounded-full animate-pulse" aria-hidden="true" />
              <div className="absolute bottom-4 -left-4 w-16 h-16 border-2 border-accent-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} aria-hidden="true" />
            </>
          )}
        </motion.div>
      </div>
    </Section>
  );
}