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
import { Solutions } from './sections/Solutions';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { useReducedMotion } from './hooks/useIntersectionObserver';
import { ThemeProvider } from './components/ThemeProvider';
import { Loader } from './components/ui/Loader';

function App() {
  const [mounted, setMounted] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
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
          initial={!mounted ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.4 }}
          className="min-h-screen bg-preto-975 text-neutral-100 antialiased dark"
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
            <Solutions />
            <CTA />
            <Contact />
          </main>

          <Footer />
          <WhatsAppFloat />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;