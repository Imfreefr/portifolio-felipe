import { motion } from 'framer-motion';
import { Award, FileSpreadsheet, GraduationCap, Target, Brain, Sparkles } from 'lucide-react';
import { Section, SectionHeader } from '../components/Section';
import { achievements } from '../data/portfolio';
import { useReducedMotion, useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { cn } from '../utils/helpers';
import { recursosVisuais } from '../data/portfolio';

const achievementDetails = [
  {
    icon: Award,
    color: 'from-amber-500 to-orange-500',
    glowColor: 'amber-500',
    tags: ['Tecnologia', 'Robótica', 'Lógica', 'Resolução de problemas', 'Pensamento analítico'],
    highlights: [
      'Competição nacional de alto nível',
      'Demonstração de habilidades técnicas práticas',
      'Trabalho em equipe sob pressão',
      'Programação de robôs autônomos',
    ],
  },
  {
    icon: FileSpreadsheet,
    color: 'from-emerald-500 to-teal-500',
    glowColor: 'emerald-500',
    tags: ['Produtividade', 'Análise de dados', 'Automação', 'Modelagem', 'Dashboards'],
    highlights: [
      'Certificação oficial Microsoft (MOS)',
      'Domínio avançado de fórmulas e funções',
      'Power Query, Power Pivot, VBA',
      'Análise e visualização de dados',
    ],
  },
  {
    icon: GraduationCap,
    color: 'from-vinho-500 to-vinho-600',
    glowColor: 'vinho-500',
    tags: ['Programação', 'Banco de dados', 'Redes', 'Hardware', 'Sistemas operacionais'],
    highlights: [
      'Formação técnica completa em TI',
      'Base sólida em desenvolvimento de software',
      'Lógica de programação e algoritmos',
      'Arquitetura de computadores e redes',
    ],
  },
];

export function Formation() {
  const reducedMotion = useReducedMotion();
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <Section
      ref={ref}
      id="formacao"
      size="lg"
      background="radial"
      aria-labelledby="formation-title"
    >
      <SectionHeader
        title="Formação & Conquistas"
        subtitle="Minhas credenciais e o que elas representam na prática."
        align="center"
      />

      <div className="max-w-4xl mx-auto mb-10 overflow-hidden rounded-3xl border border-preto-700 bg-preto-900/50">
        <img
          src={recursosVisuais.formation[0]}
          alt="Composição visual sobre formação em tecnologia e robótica"
          width="1200"
          height="800"
          loading="lazy"
          decoding="async"
          className="h-40 sm:h-52 w-full object-cover opacity-55"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasIntersected ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Formações e conquistas"
      >
        {achievements.map((achievement, index) => {
          const detail = achievementDetails[index];

          return (
            <motion.article
              key={achievement.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{
                opacity: hasIntersected ? 1 : 0,
                y: hasIntersected ? 0 : 40,
                scale: hasIntersected ? 1 : 0.95,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.7,
                delay: reducedMotion ? 0 : 0.15 + index * 0.12,
                ease: 'easeOut',
              }}
              className={cn(
                'relative overflow-hidden group',
                'bg-preto-900/80 backdrop-blur-sm border border-preto-700'
              )}
              role="listitem"
              whileHover={{ y: reducedMotion ? 0 : -8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[${detail.color.split(' ')[0].replace('from-', '')}]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />
              
              {!reducedMotion && (
                <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `linear-gradient(135deg, ${detail.color})` }} aria-hidden="true" />
              )}

              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="relative mb-6">
                  <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `linear-gradient(135deg, ${detail.color})` }}>
                    <div className="absolute inset-0 rounded-2xl blur-lg opacity-30" style={{ background: `linear-gradient(135deg, ${detail.color})` }} aria-hidden="true" />
                    <detail.icon className="w-8 h-8 text-white relative z-10" aria-hidden="true" />
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <motion.span
                      animate={{ scale: reducedMotion ? 1 : [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      className="w-2 h-2 rounded-full"
                      style={{ background: `linear-gradient(135deg, ${detail.color})` }}
                      aria-hidden="true"
                    />
                    <motion.span
                      animate={{ scale: reducedMotion ? 1 : [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 + 0.3 }}
                      className="w-2 h-2 rounded-full"
                      style={{ background: `linear-gradient(135deg, ${detail.color})` }}
                      aria-hidden="true"
                    />
                    <motion.span
                      animate={{ scale: reducedMotion ? 1 : [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 + 0.6 }}
                      className="w-2 h-2 rounded-full"
                      style={{ background: `linear-gradient(135deg, ${detail.color})` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white text-center mb-2">
                  {achievement.title}
                </h3>
                <p className="text-neutral-400 text-sm text-center mb-6">
                  {achievement.subtitle}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6" role="list" aria-label={`Competências demonstradas: ${detail.tags.join(', ')}`}>
                  {detail.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: hasIntersected ? 1 : 0, scale: hasIntersected ? 1 : 0.8 }}
                      transition={{ duration: reducedMotion ? 0 : 0.3, delay: 0.4 + tagIndex * 0.05 }}
                      className="px-2.5 py-1 rounded-full text-xs font-medium border"
                      style={{
                        backgroundColor: 'rgba(217, 74, 95, 0.1)',
                        borderColor: 'rgba(217, 74, 95, 0.2)',
                        color: '#e67280',
                      }}
                      role="listitem"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-preto-700/50">
                  <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                    O que isso demonstra na prática
                  </h4>
                  <ul className="space-y-2" role="list">
                    {detail.highlights.map((highlight, hIndex) => (
                      <motion.li
                        key={highlight}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: hasIntersected ? 1 : 0, x: hasIntersected ? 0 : -10 }}
                        transition={{ duration: reducedMotion ? 0 : 0.3, delay: 0.5 + hIndex * 0.08 }}
                        className="flex items-start gap-2 text-neutral-400 text-sm leading-relaxed"
                        role="listitem"
                      >
                        <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: detail.color.split(' ')[0].replace('from-', '') }} aria-hidden="true" />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[${detail.color.split(' ')[0].replace('from-', '')}]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 20 }}
        transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.7, ease: 'easeOut' }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-preto-900/60 border border-preto-700">
          <Target className="w-5 h-5 text-vinho-400" aria-hidden="true" />
          <span className="text-neutral-300 font-medium">
            Em constante evolução — novas certificações e conquistas em breve
          </span>
        </div>
      </motion.div>
    </Section>
  );
}