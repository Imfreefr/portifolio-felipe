import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionHeader } from '../components/Section';
import { technologies } from '../data/portfolio';
import { TechIcon, getTechColor } from '../components/TechIcon';
import { useReducedMotion, useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { cn } from '../utils/helpers';
import { useMemo } from 'react';

interface TechCardProps {
  tech: typeof technologies[0];
  index: number;
  hasIntersected: boolean;
  reducedMotion: boolean;
}

function TechCard({ tech, index, hasIntersected, reducedMotion }: TechCardProps) {
  const color = getTechColor(tech.name);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 40, scale: hasIntersected ? 1 : 0.9 }}
      transition={{
        duration: reducedMotion ? 0 : 0.6,
        delay: reducedMotion ? 0 : 0.1 + index * 0.08,
        ease: 'easeOut',
      }}
      whileHover={{
        y: reducedMotion ? 0 : -6,
        scale: reducedMotion ? 1 : 1.02,
        boxShadow: `0 20px 60px ${color}33, 0 0 0 1px ${color}40, 0 0 40px ${color}20`,
      }}
      className={cn(
        'tech-card group relative z-10',
        'bg-preto-900/80 backdrop-blur-sm border border-preto-700'
      )}
      role="listitem"
      tabIndex={0}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[${color}]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[${color}]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center text-center p-6 h-full">
        <div className="relative mb-4">
          <div 
            className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
          <TechIcon name={tech.name} size={56} aria-label={`Logo do ${tech.name}`} />
        </div>

        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[${color}] transition-colors">
          {tech.name}
        </h3>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-preto-800 border border-preto-600 text-neutral-400 group-hover:text-[${color}] group-hover:border-[${color}]/50 transition-colors">
          {tech.category}
        </span>

        <AnimatePresence>
          <motion.p
            key="description"
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-4 text-neutral-500 text-sm leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ display: 'none' }}
          >
            {tech.description}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[${color}]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
    </motion.article>
  );
}

interface FloatingTech {
  tech: typeof technologies[0];
  color: string;
  delay: number;
  xPos: number;
  yPos: number;
  scale: number;
  rotOffset: number;
}

export function Technologies() {
  const reducedMotion = useReducedMotion();
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  const floatingTechs = useMemo((): FloatingTech[] => 
    technologies.map((tech, index) => {
      const color = getTechColor(tech.name);
      const delay = index * 0.5;
      const xPos = (index % 4) * 25 + 5;
      const yPos = Math.floor(index / 4) * 40 + 10;
      const scale = 0.7 + (index % 3) * 0.15;
      const rotOffset = index * 17;

      return { tech, color, delay, xPos, yPos, scale, rotOffset };
    }), [technologies]);

  return (
    <Section
      ref={ref}
      id="tecnologias"
      size="xl"
      background="mesh"
      aria-labelledby="tech-title"
    >
      <SectionHeader
        title="Tecnologias"
        subtitle="Meu arsenal técnico para construir soluções robustas, escaláveis e modernas."
        align="center"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasIntersected ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-5 lg:gap-6"
        role="list"
        aria-label="Tecnologias que utilizo"
      >
        {technologies.map((tech, index) => (
          <TechCard
            key={tech.id}
            tech={tech}
            index={index}
            hasIntersected={hasIntersected}
            reducedMotion={reducedMotion}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 30 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, delay: 0.4, ease: 'easeOut' }}
        className="mt-16 lg:mt-20"
        aria-hidden={reducedMotion}
      >
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-preto-950 via-transparent to-preto-950 pointer-events-none" aria-hidden="true" />
          
          <div className="relative" role="img" aria-label="Tecnologias em movimento contínuo">
            <motion.div
              className="marquee-content"
              animate={{
                x: reducedMotion ? 0 : ['0%', '-50%'],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ willChange: 'transform' }}
            >
              {technologies.map((tech) => (
                <motion.div
                  key={tech.id}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-preto-900/60 border border-preto-700 whitespace-nowrap group"
                  whileHover={{
                    scale: reducedMotion ? 1 : 1.05,
                    y: reducedMotion ? 0 : -2,
                    borderColor: getTechColor(tech.name),
                    boxShadow: `0 8px 30px ${getTechColor(tech.name)}33`,
                  }}
                >
                  <TechIcon name={tech.name} size={24} aria-hidden="true" />
                  <span className="font-medium text-white text-sm">{tech.name}</span>
                </motion.div>
              ))}
              {technologies.map((tech) => (
                <motion.div
                  key={`${tech.id}-clone`}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-preto-900/60 border border-preto-700 whitespace-nowrap group"
                  whileHover={{
                    scale: reducedMotion ? 1 : 1.05,
                    y: reducedMotion ? 0 : -2,
                    borderColor: getTechColor(tech.name),
                    boxShadow: `0 8px 30px ${getTechColor(tech.name)}33`,
                  }}
                >
                  <TechIcon name={tech.name} size={24} aria-hidden="true" />
                  <span className="font-medium text-white text-sm">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {!reducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hasIntersected ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-16 relative h-64 lg:h-80 overflow-hidden"
          aria-hidden="true"
        >
          {floatingTechs.map(({ tech, color, delay, xPos, yPos, scale, rotOffset }, i) => (
            <motion.div
              key={tech.id}
              className="absolute"
              style={{
                left: `${xPos}%`,
                top: `${yPos}%`,
                transform: `scale(${scale})`,
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, 10, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay,
                ease: 'easeInOut',
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl blur-lg opacity-30" style={{ backgroundColor: color }} />
                  <TechIcon name={tech.name} size={48} aria-hidden="true" />
                </div>
                <span className="text-xs font-medium text-neutral-500 text-center whitespace-nowrap max-w-[80px]">
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 20 }}
        transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.6, ease: 'easeOut' }}
        className="mt-12 lg:mt-16 text-center"
      >
        <p className="text-neutral-500 text-sm mb-4">
          Sempre expandindo o stack. Próximas tecnologias no radar:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {['TypeScript', 'React', 'Node.js', 'Docker', 'AWS', 'PostgreSQL', 'Tailwind', 'Next.js'].map((tech) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: hasIntersected ? 1 : 0, scale: hasIntersected ? 1 : 0.8 }}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: 0.7 + Math.random() * 0.3, ease: 'easeOut' }}
              className="px-3 py-1 rounded-full bg-preto-800 border border-preto-600 text-xs font-medium text-neutral-400 hover:border-vinho-500/50 hover:text-vinho-400 transition-colors cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}