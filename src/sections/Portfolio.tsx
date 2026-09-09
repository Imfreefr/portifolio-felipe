import { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, ArrowRight, Code2, Database, Globe, Layers } from 'lucide-react';
import { Section, SectionHeader } from '../components/Section';
import { Button } from '../components/Button';
import { BentoGrid } from '../components/ui/BentoGrid';
import SmoothTab from '../components/ui/SmoothTab';
import { assetPath, getWhatsAppUrl } from '../utils/helpers';
import { personalInfo, recursosVisuais, type Projeto } from '../data/portfolio';
import { useReducedMotion, useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface PortfolioProps {
  onCtaClick?: () => void;
}

const projetosDestaque: Projeto[] = [
  {
    title: 'Sistemas Web sob medida',
    description: 'Dashboards, painéis administrativos e aplicações preparadas para crescer com o negócio.',
    image: recursosVisuais.portfolio[0],
    technologies: ['React', 'TypeScript', 'APIs'],
    category: 'Full-stack',
  },
];

const portfolioTabs = [
  { id: 'sites', title: 'Sites', description: 'Experiências institucionais e landing pages com foco em clareza, conversão e performance.', icon: Globe, color: '#d94a5f' },
  { id: 'sistemas', title: 'Sistemas', description: 'Dashboards, CRMs e aplicações web preparadas para fluxos de negócio reais.', icon: Database, color: '#b86b9a' },
  { id: 'ecommerce', title: 'E-commerce', description: 'Catálogos e lojas digitais pensados para facilitar descoberta e compra.', icon: Layers, color: '#8f6ab3' },
  { id: 'integracoes', title: 'Integrações', description: 'APIs, webhooks e automações conectando ferramentas e dados.', icon: Code2, color: '#d4777f' },
];

const projetosModelo = [
  { icon: Globe, title: 'Sites Institucionais', desc: 'Empresas, profissionais liberais, ONGs' },
  { icon: Database, title: 'Sistemas Web', desc: 'CRM, ERP, dashboards, painéis admin' },
  { icon: Layers, title: 'E-commerce', desc: 'Lojas virtuais, marketplaces, catálogos' },
  { icon: Code2, title: 'APIs & Integrações', desc: 'REST, GraphQL, webhooks, automações' },
];

export function Portfolio({ onCtaClick }: PortfolioProps) {
  const reducedMotion = useReducedMotion();
  const [abaProjeto, setSelectedPortfolioTab] = useState('sites');
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
          <div className="relative min-h-[28rem] sm:aspect-video sm:min-h-0 bg-preto-900/60 backdrop-blur-sm border border-preto-700 rounded-2xl overflow-hidden group">
            <img
              src={assetPath(projetosDestaque[0].image)}
              alt="Preview abstrata de um sistema web"
              width="1200"
              height="800"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-20 transition-opacity duration-500 group-hover:opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-vinho-500/10 via-transparent to-vinho-600/10" aria-hidden="true" />
            
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 sm:p-12 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.2, ease: 'easeOut' }}
                className="w-24 h-24 rounded-2xl bg-vinho-500/10 flex items-center justify-center mb-6"
              >
                <FolderOpen className="w-12 h-12 text-vinho-400" aria-hidden="true" />
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
                className="text-neutral-400 text-lg mb-8 max-w-md"
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
                  className="w-full sm:w-auto"
                  onClick={handleCtaClick}
                  rightIcon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
                >
                  Vamos criar seu projeto?
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={onCtaClick}>
                  Ver serviços
                </Button>
              </motion.div>
            </div>

            {!reducedMotion && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-vinho-500/20"
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

          <div className="mt-12 space-y-6" role="list" aria-label="Tipos de projetos que desenvolvo">
            <SmoothTab
              items={portfolioTabs}
              defaultTabId="sites"
              onChange={setSelectedPortfolioTab}
            />
            <BentoGrid
              key={abaProjeto}
              reducedMotion={reducedMotion}
              columns={{ base: 1, sm: 2, md: 4, lg: 4, xl: 4 }}
              gap={4}
              items={projetosModelo.map((project, index) => {
                const Icon = project.icon;
                return {
                  className: index === 0 ? 'sm:col-span-2 lg:col-span-2' : '',
                  children: (
                    <div className="relative flex h-full min-h-48 flex-col justify-between overflow-hidden p-5">
                      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-vinho-500/10 blur-2xl transition-opacity group-hover:opacity-100" aria-hidden="true" />
                      <div className="relative z-10 flex items-start justify-between gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-vinho-500/10 text-vinho-400">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <span className="text-xs font-medium uppercase tracking-wider text-vinho-400/80">Projeto</span>
                      </div>
                      <div className="relative z-10 mt-8">
                        <h4 className="font-semibold text-white text-lg">{portfolioTabs.find((tab) => tab.id === abaProjeto)?.title} · {project.title}</h4>
                        <p className="mt-2 text-neutral-400 text-sm leading-relaxed">{project.desc}</p>
                      </div>
                    </div>
                  ),
                };
              })}
            />
          </div>
        </div>
      </motion.div>
    </Section>
  );
}