import { motion } from 'framer-motion';
import { MessageSquare, Phone, MapPin, Clock, ArrowRight, Send } from 'lucide-react';
import { Section, SectionHeader } from '../components/Section';
import { Button } from '../components/Button';
import { getWhatsAppUrl } from '../utils/helpers';
import { contactInfo, personalInfo } from '../data/portfolio';
import { useReducedMotion, useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { cn } from '../utils/helpers';

export function Contact() {
  const reducedMotion = useReducedMotion();
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  const handleWhatsAppClick = (messageKey: keyof typeof personalInfo.whatsapp.messages) => {
    window.open(
      getWhatsAppUrl(personalInfo.whatsapp.messages[messageKey]),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <Section
      ref={ref}
      id="contato"
      size="lg"
      background="radial"
      aria-labelledby="contact-title"
    >
      <SectionHeader
        title="Vamos conversar?"
        subtitle="Estou disponível para novos projetos. Entre em contato e vamos tirar sua ideia do papel."
        align="center"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasIntersected ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.5 }}
        className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: hasIntersected ? 1 : 0, x: hasIntersected ? 0 : -40 }}
          transition={{ duration: reducedMotion ? 0 : 0.7, delay: 0.1, ease: 'easeOut' }}
          className="space-y-8"
        >
          <div className="bg-dark-900/60 backdrop-blur-sm border border-dark-700 rounded-2xl p-8 lg:p-10">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              {contactInfo.name}
            </h3>
            <p className="text-primary-400 font-medium mb-8">
              {contactInfo.title}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-dark-950/50 rounded-xl border border-dark-700 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-green-500" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-dark-500 text-sm uppercase tracking-wider font-medium mb-1">
                    WhatsApp
                  </p>
                  <a
                    href={contactInfo.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium hover:text-green-400 transition-colors break-all"
                  >
                    {contactInfo.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-dark-950/50 rounded-xl border border-dark-700">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-500" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-dark-500 text-sm uppercase tracking-wider font-medium mb-1">
                    Localização
                  </p>
                  <p className="text-dark-300">Brasil — Atendimento remoto</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-dark-950/50 rounded-xl border border-dark-700">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent-500" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-dark-500 text-sm uppercase tracking-wider font-medium mb-1">
                    Disponibilidade
                  </p>
                  <p className="text-dark-300">Segunda a Sexta, 9h às 18h (BRT)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="primary"
              className="w-full py-4"
              onClick={() => handleWhatsAppClick('orcamento')}
              rightIcon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
            >
              <MessageSquare className="w-5 h-5 mr-1 -ml-1" aria-hidden="true" />
              Solicitar Orçamento
            </Button>
            <Button
              variant="outline"
              className="w-full py-4"
              onClick={() => handleWhatsAppClick('desenvolvimento')}
              rightIcon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
            >
              <Send className="w-5 h-5 mr-1 -ml-1" aria-hidden="true" />
              Falar sobre Projeto
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: hasIntersected ? 1 : 0, x: hasIntersected ? 0 : 40 }}
          transition={{ duration: reducedMotion ? 0 : 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="relative aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-accent-500/20 rounded-3xl blur-2xl" aria-hidden="true" />
            
            <div className="relative bg-dark-900/80 backdrop-blur-sm border border-dark-700 rounded-3xl p-8 h-full">
              <div className="h-full flex flex-col justify-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.3, type: 'spring', damping: 20 }}
                  className="text-center mb-8"
                >
                  <div className="w-20 h-20 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-10 h-10 text-green-500" aria-hidden="true" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Iniciar conversa no WhatsApp</h4>
                  <p className="text-dark-400">Clique no botão abaixo para abrir o WhatsApp com uma mensagem pré-definida.</p>
                </motion.div>

                <div className="space-y-4">
                  {[
                    { key: 'orcamento', label: 'Solicitar orçamento', icon: '💰' },
                    { key: 'desenvolvimento', label: 'Desenvolvimento web', icon: '💻' },
                    { key: 'contato', label: 'Conversar', icon: '💬' },
                  ].map((item) => (
                    <motion.button
                      key={item.key}
                      onClick={() => handleWhatsAppClick(item.key as keyof typeof personalInfo.whatsapp.messages)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: reducedMotion ? 0 : 0.4, delay: 0.4 + Math.random() * 0.2 }}
                      whileHover={{ x: reducedMotion ? 0 : 4 }}
                      whileTap={{ scale: reducedMotion ? 1 : 0.98 }}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-dark-950/50 border border-dark-700 hover:border-primary-500/30 hover:bg-dark-900 transition-all text-left group"
                    >
                      <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                      <span className="font-medium text-white group-hover:text-primary-400 transition-colors">{item.label}</span>
                      <ArrowRight className="w-5 h-5 text-dark-500 group-hover:text-primary-500 transition-colors" aria-hidden="true" />
                    </motion.button>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.4, delay: 0.6 }}
                  className="mt-8 pt-6 border-t border-dark-700/50 text-center text-dark-500 text-sm"
                >
                  Ou envie uma mensagem personalizada:
                  <br />
                  <a
                    href={contactInfo.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:text-primary-400 font-medium inline-flex items-center gap-1 mt-2"
                  >
                    Abrir WhatsApp direto
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: hasIntersected ? 1 : 0, y: hasIntersected ? 0 : 20 }}
        transition={{ duration: reducedMotion ? 0 : 0.6, delay: 0.5, ease: 'easeOut' }}
        className="mt-16"
      >
        <div className="bg-dark-900/40 backdrop-blur-sm border border-dark-700 rounded-2xl p-8 lg:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h4 className="text-lg font-semibold text-white mb-4">
              Prefere enviar os detalhes do projeto por aqui?
            </h4>
            <p className="text-dark-400 mb-8">
              A estrutura para formulário de contato já está preparada. 
              Quando você quiser, posso integrar com EmailJS, Formspree, Netlify Forms ou seu backend preferido.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-dark-800 border border-dark-600 text-dark-400">
                EmailJS
              </span>
              <span className="px-3 py-1 rounded-full bg-dark-800 border border-dark-600 text-dark-400">
                Formspree
              </span>
              <span className="px-3 py-1 rounded-full bg-dark-800 border border-dark-600 text-dark-400">
                Netlify Forms
              </span>
              <span className="px-3 py-1 rounded-full bg-dark-800 border border-dark-600 text-dark-400">
                Backend customizado
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}