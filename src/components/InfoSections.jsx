import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, Clock, ShieldAlert, Workflow, Zap } from 'lucide-react';

const sponsors = [
  { 
    name: "Caco. Alimentação", 
    color: "from-surreal-cyan to-blue-600",
    shadow: "shadow-[0_0_60px_rgba(0,240,255,0.2)]",
    logo: "/public/patrocinador1.jpg" 
  },
  { 
    name: "Cantina do Custódio", 
    color: "from-surreal-magenta to-red-600",
    shadow: "shadow-[0_0_60px_rgba(255,0,60,0.2)]",
    logo: "/public/patrocinador2.jpg" 
  },
  { 
    name: "Vitorio's Restaurante", 
    color: "from-surreal-purple to-purple-800",
    shadow: "shadow-[0_0_60px_rgba(138,43,226,0.2)]",
    logo: "/public/patrocinador3.jpeg" 
  }
];

export default function InfoSections() {
  const [openFaq, setOpenFaq] = useState(null);
  const [currentSponsor, setCurrentSponsor] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSponsor((prev) => (prev + 1) % sponsors.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

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
      
      {/* Luzes de Fundo */}
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

      {/* PATROCINADORES - DESTAQUE MÁXIMO NA LOGO */}
      <section className="max-w-6xl mx-auto px-4 py-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-black text-white mb-4 flex justify-center items-center gap-3">
            <Zap className="text-surreal-neon" size={32} /> PATROCINADORES
          </h2>
        </motion.div>

        <div className="flex justify-center items-center h-[500px] perspective-[2000px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSponsor}
              initial={{ opacity: 0, scale: 0.5, z: -500, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, z: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 1.2, z: 200, filter: "blur(20px)" }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className={`relative w-full max-w-2xl h-full flex flex-col justify-center items-center group`}
            >
              {/* Brilho de Fundo Dinâmico - Mais intenso */}
              <div className={`absolute inset-0 bg-gradient-to-br ${sponsors[currentSponsor].color} opacity-30 blur-[100px] group-hover:opacity-50 transition-opacity duration-1000`}></div>
              
              {/* LOGO GIGANTE E FLUTUANTE */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-20 w-full flex flex-col items-center"
              >
                <div className="w-64 h-64 md:w-96 md:h-96 flex items-center justify-center p-4">
                  <img 
                    src={sponsors[currentSponsor].logo} 
                    alt={`Logo ${sponsors[currentSponsor].name}`} 
                    className="max-w-full max-h-full object-contain filter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="text-surreal-cyan font-mono text-xl text-center border-2 border-dashed border-surreal-cyan/30 p-10 rounded-full">LOGO:<br/>${sponsors[currentSponsor].name}</div>`;
                    }}
                  />
                </div>

                {/* Info Textual Subtil para não roubar a cena */}
                <div className="mt-8 text-center">
                  <span className={`px-6 py-1 rounded-full text-xs font-bold tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-white/60 mb-4 block w-fit mx-auto`}>
                    Cota {sponsors[currentSponsor].tier}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic opacity-90">
                    {sponsors[currentSponsor].name}
                  </h3>
                </div>
              </motion.div>

              {/* Elementos Decorativos de Fundo */}
              <div className={`absolute -bottom-10 w-3/4 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm`}></div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navegação Dots */}
        <div className="flex justify-center gap-6 mt-4">
          {sponsors.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentSponsor(index)}
              className={`h-1.5 transition-all duration-700 rounded-full ${
                currentSponsor === index 
                  ? 'w-16 bg-surreal-cyan shadow-[0_0_20px_rgba(0,240,255,0.8)]' 
                  : 'w-4 bg-white/10 hover:bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* MAPA */}
      <section className="max-w-5xl mx-auto px-4 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black text-white mb-4 flex justify-center items-center gap-3">
            <MapPin className="text-surreal-magenta" size={36} /> Localização
          </h2>
        </motion.div>

        <motion.div 
          className="w-full h-[450px] glass-panel p-2 rounded-[32px] overflow-hidden relative"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.3327064247605!2d-51.143334423921836!3d-23.303684452177638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94eb437a3d1d44af%3A0x9c9f46adfc62d1eb!2sUniCesumar%20-%20Londrina!5e0!3m2!1spt-BR!2sbr!4v1777981365322!5m2!1spt-BR!2sbr" 
            className="w-full h-full border-0 rounded-[24px] filter invert-[90%] hue-rotate-180 contrast-125" 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </motion.div>
      </section>

    </div>
  );
}