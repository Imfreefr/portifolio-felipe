import { motion } from 'framer-motion';
import { FolderOpen, Plus, ArrowRight, Code2, Database, Globe, Layers } from 'lucide-react';
import { Section, SectionHeader } from '../components/Section';
import { Button } from '../components/Button';
import { getWhatsAppUrl } from '../utils/helpers';
import { personalInfo } from '../data/portfolio';
import { useReducedMotion, useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { cn } from '../utils/helpers';

interface PortfolioProps {
  onCtaClick?: () => void;
}

const placeholderProjects = [
  { icon: Globe, title: 'Sites Institucionais', desc: 'Empresas, profissionais liberais, ONGs' },
  { icon: Database, title: 'Sistemas Web', desc: 'CRM, ERP, dashboards, painéis admin' },
  { icon: Layers, title: 'E-commerce', desc: 'Lojas virtuais, marketplaces, catálogos' },
  { icon: Code2, title: 'APIs & Integrações', desc: 'REST, GraphQL, webhooks, automações' },
];

export function Portfolio({ onCtaClick }: PortfolioProps) {
  const reducedMotion = useReducedMotion();
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.15 });

  const handleCtaClick = () => {
    window.open(
      getWhatsAppUrl(personalInfo.whatsapp.messages.orcamento),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <Section
      ref={ref}
      id="portfolio"
      size="lg"
      background="radial"
      aria-labelledby="portfolio-title"
    >
      <SectionHeader
        title="Projetos em breve"
        subtitle="Estou preparando novos projetos para apresentar aqui. Em breve, esta seção contará com trabalhos e soluções desenvolvidas por mim."
        align="center"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 30 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: 'easeOut' }}
        className="max-w-3xl mx-auto"
      >
        <div className="relative">
          <div className="aspect-video bg-dark-900/60 backdrop-blur-sm border border-dark-700 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10" aria-hidden="true" />
            
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.2, ease: 'easeOut' }}
                className="w-24 h-24 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-6"
              >
                <FolderOpen className="w-12 h-12 text-primary-500" aria-hidden="true" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.3, ease: 'easeOut' }}
                className="text-2xl lg:text-3xl font-bold text-white mb-4"
              >
                Portfólio em construção
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.4, ease: 'easeOut' }}
                className="text-dark-400 text-lg mb-8 max-w-md"
              >
                Esta seção será preenchida com projetos reais conforme forem concluídos. A estrutura já está pronta para receber novos trabalhos.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.5, ease: 'easeOut' }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleCtaClick}
                  rightIcon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
                >
                  Vamos criar seu projeto?
                </Button>
                <Button variant="outline" size="lg" onClick={onCtaClick}>
                  Ver serviços
                </Button>
              </motion.div>
            </div>

            {!reducedMotion && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary-500/20"
                    style={{
                      top: `${15 + i * 12}%`,
                      left: `${10 + (i % 3) * 25}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 20 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.6, ease: 'easeOut' }}
            className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4"
            role="list"
            aria-label="Tipos de projetos que desenvolvo"
          >
            {placeholderProjects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.5, delay: 0.7 + index * 0.1, ease: 'easeOut' }}
                className={cn(
                  'card-hover p-4 text-center group',
                  'bg-dark-900/60 border-dark-700'
                )}
                role="listitem"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-500/20 transition-colors">
                  <project.icon className="w-5 h-5 text-primary-500" aria-hidden="true" />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{project.title}</h4>
                <p className="text-dark-500 text-xs">{project.desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasIntersected ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.5, delay: 1 }}
        className="mt-16 text-center"
      >
        <p className="text-dark-500 text-sm">
          Desenvolvedor? A estrutura de dados para projetos está em
          <code className="text-primary-400 bg-dark-800 px-1.5 py-0.5 rounded text-xs font-mono">
            src/data/portfolio.ts
          </code>
        </p>
      </motion.div>
    </Section>
  );
}