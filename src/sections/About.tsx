import { motion } from 'framer-motion';
import { Award, FileSpreadsheet, GraduationCap, Code, Brain, Target } from 'lucide-react';
import { Section, SectionHeader } from '../components/Section';
import { aboutText } from '../data/portfolio';
import { useReducedMotion, useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { assetPath, cn } from '../utils/helpers';
import { recursosVisuais } from '../data/portfolio';
import Carousel from '../components/ui/Carousel';

const highlights = [
  { icon: GraduationCap, title: 'Formação Técnica', desc: 'Curso Técnico em Informática', color: 'text-vinho-400', bgColor: 'bg-vinho-500/10' },
  { icon: Award, title: 'Medalha de Ouro OBR', desc: 'Olimpíada Brasileira de Robótica', color: 'text-amber-400', bgColor: 'bg-amber-500/10' },
  { icon: FileSpreadsheet, title: 'Especialista Excel', desc: 'Certificação MOS Microsoft', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
  { icon: Code, title: 'Desenvolvimento Web', desc: 'Sites, sistemas & interfaces', color: 'text-vinho-400', bgColor: 'bg-vinho-500/10' },
  { icon: Brain, title: 'Pensamento Analítico', desc: 'Lógica & resolução de problemas', color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  { icon: Target, title: 'Foco em UX/Qualidade', desc: 'Experiência do usuário & código limpo', color: 'text-rose-400', bgColor: 'bg-rose-500/10' },
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
            <p className="text-neutral-300 text-lg leading-relaxed mb-6">
              {aboutText.split('\n\n')[0]}
            </p>
            <p className="text-neutral-400 leading-relaxed mb-6">
              {aboutText.split('\n\n')[1]}
            </p>
            <p className="text-neutral-400 leading-relaxed">
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
                  'bg-preto-900/60 border-preto-700'
                )}
                role="listitem"
              >
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', `${item.bgColor} group-hover:${item.bgColor.replace('500/10', '500/20')} transition-colors`)}>
                  <item.icon className={cn('w-5 h-5', item.color)} aria-hidden="true" />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{item.title}</h4>
                <p className="text-neutral-400 text-xs">{item.desc}</p>
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
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-vinho-500/20 via-transparent to-vinho-600/20 rounded-3xl blur-2xl" aria-hidden="true" />
            
<div className="relative bg-preto-900/80 backdrop-blur-sm border border-preto-700 rounded-3xl p-4 sm:p-6 h-full overflow-hidden">
               <img
                 src={assetPath(recursosVisuais.about[0])}
                 alt="Composição visual de um workspace de desenvolvimento web"
                 width="1200"
                 height="800"
                 loading="lazy"
                 decoding="async"
                 className="w-full aspect-[3/2] object-cover rounded-2xl border border-preto-700/70 mb-6"
               />
<Carousel
                 items={[
                   { id: 'web', title: 'Desenvolvimento Full-Stack', description: 'Front-end & Back-end com tecnologias modernas.', icon: <Code className="w-6 h-6" /> },
                   { id: 'logic', title: 'Pensamento Computacional', description: 'Lógica, algoritmos e resolução de problemas.', icon: <Brain className="w-6 h-6" /> },
                   { id: 'obr', title: 'Medalha de Ouro OBR', description: 'Robótica, automação e competição técnica.', icon: <Award className="w-6 h-6" /> },
                   { id: 'excel', title: 'Certificação MOS Excel', description: 'Produtividade avançada e análise de dados.', icon: <FileSpreadsheet className="w-6 h-6" /> },
                 ]}
                 autoplay
                 autoplayDelay={4200}
                 pauseOnHover
               />
            </div>
          </div>

          {!reducedMotion && (
            <>
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-vinho-500/30 rounded-full animate-pulse" aria-hidden="true" />
              <div className="absolute bottom-4 -left-4 w-16 h-16 border-2 border-vinho-600/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} aria-hidden="true" />
            </>
          )}
        </motion.div>
      </div>
    </Section>
  );
}