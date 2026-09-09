import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dock from './components/ui/Dock';
import StaggeredMenu from './components/ui/StaggeredMenu';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { Portfolio } from './sections/Portfolio';
import { Technologies } from './sections/Technologies';
import { Differentials } from './sections/Differentials';
import { Formation } from './sections/Formation';
import { Process } from './sections/Process';
import { CTA } from './sections/CTA';
import { Contact } from './sections/Contact';
import { Solutions } from './sections/Solutions';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { useReducedMotion } from './hooks/useIntersectionObserver';
import { ThemeProvider } from './components/ThemeProvider';
import { Loader } from './components/ui/Loader';
import { assetPath, scrollToSection } from './utils/helpers';
import {
  User,
  Briefcase,
  Cpu,
  Award,
  GraduationCap,
  GitBranch,
  Mail,
  Lightbulb,
} from 'lucide-react';

const dockItems = [
  { icon: <User size={18} />, label: 'Sobre', onClick: () => scrollToSection('sobre') },
  { icon: <Briefcase size={18} />, label: 'Serviços', onClick: () => scrollToSection('servicos') },
  { icon: <Cpu size={18} />, label: 'Tecnologias', onClick: () => scrollToSection('tecnologias') },
  { icon: <Award size={18} />, label: 'Diferenciais', onClick: () => scrollToSection('diferenciais') },
  { icon: <GraduationCap size={18} />, label: 'Formação', onClick: () => scrollToSection('formacao') },
  { icon: <GitBranch size={18} />, label: 'Processo', onClick: () => scrollToSection('processo') },
  { icon: <Mail size={18} />, label: 'Contato', onClick: () => scrollToSection('contato') },
  { icon: <Lightbulb size={18} />, label: 'Soluções', onClick: () => scrollToSection('solucoes') },
];

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const scrollToWork = () => {
    document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {showLoader && <Loader key="loader" />}
        
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.4 }}
          className="min-h-screen bg-preto-975 text-neutral-100 antialiased"
        >
          <main id="main-content" className="pb-24">
            <Hero onScrollToWork={scrollToWork} />
            <About />
            <Services />
            <Portfolio onCtaClick={scrollToWork} />
            <Technologies />
            <Differentials />
            <Formation />
            <Process />
            <Solutions />
            <CTA />
            <Contact />
          </main>

          <Footer />
          <WhatsAppFloat />

          <div className="hidden lg:block fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
            <div className="pointer-events-auto flex justify-center">
              <Dock items={dockItems} />
            </div>
          </div>

          <div className="lg:hidden">
            <StaggeredMenu
              position="right"
              items={[
                { label: 'Sobre', ariaLabel: 'Ir para Sobre mim', link: '#sobre' },
                { label: 'Serviços', ariaLabel: 'Ir para Serviços', link: '#servicos' },
                { label: 'Tecnologias', ariaLabel: 'Ir para Tecnologias', link: '#tecnologias' },
                { label: 'Portfolio', ariaLabel: 'Ir para Portfolio', link: '#portfolio' },
                { label: 'Formação', ariaLabel: 'Ir para Formação', link: '#formacao' },
                { label: 'Contato', ariaLabel: 'Ir para Contato', link: '#contato' },
              ]}
              socialItems={[
                { label: 'GitHub', link: 'https://github.com/ImFreeFr' },
                { label: 'Instagram', link: 'https://www.instagram.com/fp_souzx/' },
                { label: 'LinkedIn', link: 'https://www.linkedin.com/in/felipe-souza-nascimento-915615228/' },
              ]}
              displaySocials
              displayItemNumbering
              colors={['#3d1224', '#7a2c42']}
              accentColor="#d94a5f"
              logoUrl={assetPath('/imgs/noctra-simbolo-branco-transparente.png')}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;