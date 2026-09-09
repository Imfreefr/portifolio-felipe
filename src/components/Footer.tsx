import { motion } from 'framer-motion';
import { MessageSquare, Code2, Palette, Database, Globe, Heart, ArrowUp } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { getWhatsAppUrl } from '../utils/helpers';
import { personalInfo } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useIntersectionObserver';
import { assetPath, cn } from '../utils/helpers';

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
    <footer className="relative border-t border-preto-800" role="contentinfo">
      <div className="absolute inset-0 bg-gradient-to-t from-preto-950 to-transparent" aria-hidden="true" />
      
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
              <img
                src={assetPath('/imgs/noctra-simbolo-branco-transparente.png')}
                alt="Noctra" 
                className="w-8 h-8"
              />
              <span>Felipe Souza Nascimento</span>
            </div>
            <p className="text-neutral-400 leading-relaxed mb-6 max-w-xs">
              Web Designer & Web Developer transformando ideias em experiências digitais modernas, funcionais e pensadas para cada projeto.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={personalInfo.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => { e.preventDefault(); handleWhatsAppClick('contato'); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors"
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
                    className="text-neutral-400 hover:text-vinho-400 transition-colors text-sm"
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
                  <span className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm cursor-default">
                    <service.icon className="w-4 h-4 text-vinho-400" aria-hidden="true" />
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
            <h4 className="font-semibold text-white mb-4">Conecte-se</h4>
            <div className="flex flex-col gap-3">
              <a
                href={personalInfo.social.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-preto-800 border border-preto-600 text-sm font-medium text-neutral-400 hover:border-vinho-500/50 hover:text-vinho-400 hover:bg-preto-700 transition-colors"
              >
                <FaGithub className="w-5 h-5" aria-hidden="true" />
                <span>GitHub</span>
                <span className="text-neutral-600">@ImFreeFr</span>
              </a>
              <a
                href={personalInfo.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-preto-800 border border-preto-600 text-sm font-medium text-neutral-400 hover:border-vinho-500/50 hover:text-vinho-400 hover:bg-preto-700 transition-colors"
              >
                <FaInstagram className="w-5 h-5" aria-hidden="true" />
                <span>Instagram</span>
                <span className="text-neutral-600">@fp_souzx</span>
              </a>
              <a
                href={personalInfo.social.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-preto-800 border border-preto-600 text-sm font-medium text-neutral-400 hover:border-vinho-500/50 hover:text-vinho-400 hover:bg-preto-700 transition-colors"
              >
                <FaLinkedin className="w-5 h-5" aria-hidden="true" />
                <span>LinkedIn</span>
                <span className="text-neutral-600">Felipe Souza Nascimento</span>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-preto-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-neutral-500 text-sm"
            >
              © {currentYear} Felipe Souza Nascimento. Todos os direitos reservados.
              <br />
              Desenvolvido com{' '}
              <span className="flex inline-items-center gap-1">
                <Heart className="w-3 h-3 text-rose-500" aria-hidden="true" />
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
                className="p-2 rounded-lg bg-preto-800 border border-preto-700 text-neutral-400 hover:bg-preto-700 hover:text-white hover:border-vinho-500/50 transition-colors"
                aria-label="Voltar ao topo"
              >
                <ArrowUp className="w-5 h-5" aria-hidden="true" />
              </a>

              <a
                href={personalInfo.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => { e.preventDefault(); handleWhatsAppClick('contato'); }}
                className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-colors"
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