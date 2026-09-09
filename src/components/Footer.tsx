import { motion } from 'framer-motion';
import { MessageSquare, Code2, Palette, Database, Globe, Heart, ArrowUp } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/helpers';
import { personalInfo } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useIntersectionObserver';
import { cn } from '../utils/helpers';

export function Footer() {
  const reducedMotion = useReducedMotion();

  const handleWhatsAppClick = (messageKey: keyof typeof personalInfo.whatsapp.messages) => {
    window.open(
      getWhatsAppUrl(personalInfo.whatsapp.messages[messageKey]),
      '_blank',
      'noopener,noreferrer'
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Início', href: '#home' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Tecnologias', href: '#tecnologias' },
    { label: 'Formação', href: '#formacao' },
    { label: 'Processo', href: '#processo' },
    { label: 'Contato', href: '#contato' },
  ];

  const services = [
    { label: 'Desenvolvimento de Sites', icon: Globe },
    { label: 'Landing Pages', icon: Globe },
    { label: 'Sistemas Web', icon: Database },
    { label: 'Design de Interfaces', icon: Palette },
    { label: 'Front-end & Back-end', icon: Code2 },
  ];

  return (
    <footer className="relative border-t border-dark-800" role="contentinfo">
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent" aria-hidden="true" />
      
      <div className="container relative z-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: 'easeOut' }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2 text-white font-bold text-xl lg:text-2xl mb-4">
              <span className="text-primary-500">FSN</span>
              <span>Felipe Souza Nascimento</span>
            </div>
            <p className="text-dark-400 leading-relaxed mb-6 max-w-xs">
              Web Designer & Web Developer transformando ideias em experiências digitais modernas, funcionais e pensadas para cada projeto.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={personalInfo.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => { e.preventDefault(); handleWhatsAppClick('contato'); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.1, ease: 'easeOut' }}
            aria-label="Navegação do rodapé"
          >
            <h4 className="font-semibold text-white mb-4">Navegação</h4>
            <ul className="space-y-3" role="list">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <h4 className="font-semibold text-white mb-4">Serviços</h4>
            <ul className="space-y-3" role="list">
              {services.map((service) => (
                <li key={service.label}>
                  <span className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors text-sm cursor-default">
                    <service.icon className="w-4 h-4 text-primary-500" aria-hidden="true" />
                    {service.label}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            <h4 className="font-semibold text-white mb-4">Tecnologias</h4>
            <div className="flex flex-wrap gap-2">
              {['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'MySQL', 'Git', 'GitHub'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-dark-800 border border-dark-600 text-xs font-medium text-dark-400 hover:border-primary-500/50 hover:text-primary-400 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-dark-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-dark-500 text-sm"
            >
              © {currentYear} Felipe Souza Nascimento. Todos os direitos reservados.
              <br />
              Desenvolvido com{' '}
              <span className="flex inline-items-center gap-1">
                <Heart className="w-3 h-3 text-red-500" aria-hidden="true" />
              </span>{' '}
              e muito código.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); scrollToTop(); }}
                className="p-2 rounded-lg bg-dark-800 border border-dark-700 text-dark-400 hover:bg-dark-700 hover:text-white hover:border-primary-500/50 transition-colors"
                aria-label="Voltar ao topo"
              >
                <ArrowUp className="w-5 h-5" aria-hidden="true" />
              </a>

              <a
                href={personalInfo.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => { e.preventDefault(); handleWhatsAppClick('contato'); }}
                className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 hover:bg-green-500/20 hover:border-green-500/40 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-5 h-5" aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}