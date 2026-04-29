import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, Clock, ShieldAlert, Workflow } from 'lucide-react';

export default function InfoSections() {
  const [openFaq, setOpenFaq] = useState(null);

  const schedule = [
    { time: "19:00", title: "Credenciamento e Abertura", icon: <Clock size={20} /> },
    { time: "19:30", title: "Automação de Workflows e IA com n8n", icon: <Workflow size={20} /> },
    { time: "20:30", title: "Red Team: Estratégias de Segurança Ofensiva", icon: <ShieldAlert size={20} /> },
    { time: "21:30", title: "Coffee Break & Networking", icon: <Clock size={20} /> }
  ];

  const faqs = [
    { q: "O evento é gratuito?", a: "Sim! A Tech Week é totalmente gratuita para estudantes e comunidade externa." },
    { q: "Haverá emissão de certificado?", a: "Sim, todos os participantes que confirmarem presença receberão certificado de horas complementares validado via blockchain." },
    { q: "Como submeto meu projeto?", a: "Basta acessar a área de inscrição acima e selecionar a aba 'Apresentar Projeto'." }
  ];

  return (
    <div className="bg-surreal-bg text-white pb-32 relative overflow-hidden">
      
      {/* Efeitos de luz de fundo para manter a consistência com o topo */}
      <div className="absolute top-1/4 right-0 w-[30vw] h-[30vw] bg-surreal-cyan/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] bg-surreal-purple/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none"></div>

      {/* CRONOGRAMA */}
      <section className="max-w-4xl mx-auto px-4 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-surreal-cyan to-surreal-purple mb-4">Line-up Oficial</h2>
          <p className="text-gray-400">A jornada de conhecimento programada para o evento.</p>
        </motion.div>

        <div className="space-y-4">
          {schedule.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              key={index} 
              className="glass-panel p-6 rounded-2xl flex items-center gap-6 group hover:bg-white/5 hover:border-surreal-cyan/50 transition-all duration-300"
            >
              <div className="bg-black/50 p-4 rounded-xl text-surreal-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-shadow">
                {item.icon}
              </div>
              <div>
                <span className="text-surreal-cyan font-mono text-sm tracking-widest">{item.time}</span>
                <h3 className="text-xl font-bold text-white mt-1 group-hover:text-surreal-cyan transition-colors">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black text-white mb-4">Protocolo de Dúvidas</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={index} 
              className="glass-panel rounded-2xl overflow-hidden"
            >
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-lg">{faq.q}</span>
                <ChevronDown className={`transform transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-surreal-magenta' : 'text-surreal-cyan'}`} />
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-gray-400 bg-black/20"
                  >
                    <div className="pt-4 border-t border-white/5">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MAPA / LOCALIZAÇÃO */}
      <section className="max-w-5xl mx-auto px-4 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black text-white mb-4 flex justify-center items-center gap-3">
            <MapPin className="text-surreal-magenta" size={36} /> Ponto de Encontro
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full h-[450px] glass-panel p-2 rounded-[32px] overflow-hidden shadow-[0_0_50px_rgba(138,43,226,0.15)] relative group"
        >
          {/* Borda neon animada no hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-surreal-cyan via-surreal-purple to-surreal-magenta opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
          
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14668.646543168233!2d-51.1610!3d-23.2915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1714340000000!5m2!1spt-BR!2sbr" 
            className="w-full h-full border-0 rounded-[24px] filter contrast-125 grayscale-[20%] invert-[90%] hue-rotate-180" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </section>

    </div>
  );
}