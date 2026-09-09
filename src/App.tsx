import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
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
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { useReducedMotion } from './hooks/useIntersectionObserver';

function App() {
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToWork = () => {
    document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">FSN</span>
          </div>
          <p className="text-dark-400">Carregando portfólio...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="app"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.4 }}
        className="min-h-screen bg-dark-950 text-dark-100 antialiased"
      >
        <Navigation />
        
        <main id="main-content" className="pt-16 lg:pt-20">
          <Hero onScrollToWork={scrollToWork} />
          <About />
          <Services />
          <Portfolio onCtaClick={scrollToWork} />
          <Technologies />
          <Differentials />
          <Formation />
          <Process />
          <CTA />
          <Contact />
        </main>

        <Footer />
        <WhatsAppFloat />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;