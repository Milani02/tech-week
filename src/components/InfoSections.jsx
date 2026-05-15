import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, Zap } from 'lucide-react';

// 1. IMPORTAÇÕES DOS PATROCINADORES
import logoCaco from '../assets/Patrocinador1.png'; 
import logoCantina from '../assets/Patrocinador2.jpg';
import logoVitorio from '../assets/Patrocinador3.png';
import patrocinador4 from '../assets/Patrocinador4.png';
import patrocinador5 from '../assets/Patrocinador5.png';
import patrocinador6 from '../assets/Patrocinador6.png';
import patrocinador7 from '../assets/Patrocinador7.png';
import patrocinador8 from '../assets/Patrocinador8.png';
import patrocinador9 from '../assets/Patrocinador9.png';
import patrocinador10 from '../assets/Patrocinador10.png';
import patrocinador11 from '../assets/Patrocinador11.png';
import patrocinador12 from '../assets/Patrocinador12.png';
import patrocinador13 from '../assets/Patrocinador13.png';
import patrocinador14 from '../assets/Patrocinador14.png';

const sponsors = [
  { name: "Caco Alimentação", color: "from-surreal-cyan to-blue-600", logo: logoCaco },
  { name: "Cantina do Custódio", color: "from-surreal-magenta to-red-600", logo: logoCantina },
  { name: "Vitorio's Restaurante", color: "from-surreal-purple to-purple-800", logo: logoVitorio },
  { name: "ESTMA", color: "from-surreal-cyan to-blue-600", logo: patrocinador4 },
  { name: "Óculos Express", color: "from-surreal-magenta to-red-600", logo: patrocinador5 },
  { name: "Minas Casa Empório", color: "from-surreal-purple to-purple-800", logo: patrocinador6 },
  { name: "Hanke", color: "from-surreal-cyan to-blue-600", logo: patrocinador7 },
  { name: "M2 Centro Automotivo", color: "from-surreal-magenta to-red-600", logo: patrocinador8 },
  { name: "Quali Mais", color: "from-surreal-purple to-purple-800", logo: patrocinador9 },
  { name: "Zona Country", color: "from-surreal-cyan to-blue-600", logo: patrocinador10 },
  { name: "VR veiculo rastreado", color: "from-surreal-magenta to-red-600", logo: patrocinador11 },
  { name: "Elite Solar", color: "from-surreal-purple to-purple-800", logo: patrocinador12 },
  { name: "Restaurante Araguaia", color: "from-surreal-cyan to-blue-600", logo: patrocinador13 },
  { name: "VideoMaker", color: "from-surreal-cyan to-blue-600", logo: patrocinador14 }
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

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-20 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl font-black text-white mb-4">Protocolo de Dúvidas</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-panel rounded-2xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full text-left p-6 flex justify-between items-center hover:bg-white/5 transition-colors">
                <span className="font-bold text-lg">{faq.q}</span>
                <ChevronDown className={`transform transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-surreal-magenta' : 'text-surreal-cyan'}`} />
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-gray-400 bg-black/20">
                    <div className="pt-4 border-t border-white/5">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PATROCINADORES */}
      <section className="max-w-6xl mx-auto px-4 py-24 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <h2 className="text-4xl font-black text-white mb-4 flex justify-center items-center gap-3">
            <Zap className="text-surreal-neon" size={32} /> PATROCINADORES
          </h2>
        </motion.div>

        <div className="flex justify-center items-center h-[500px] perspective-[2000px]">
          <AnimatePresence mode="wait">
            <motion.div key={currentSponsor} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }} className="relative w-full max-w-2xl h-full flex flex-col justify-center items-center group">
              <div className={`absolute inset-0 bg-gradient-to-br ${sponsors[currentSponsor].color} opacity-30 blur-[100px]`}></div>
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-20 w-full flex flex-col items-center">
                <div className="w-64 h-64 md:w-96 md:h-96 flex items-center justify-center p-4">
                  <img src={sponsors[currentSponsor].logo} alt={sponsors[currentSponsor].name} className="max-w-full max-h-full object-contain filter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
                </div>
                <h3 className="mt-8 text-4xl md:text-5xl font-black text-white uppercase italic opacity-90">{sponsors[currentSponsor].name}</h3>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center gap-6 mt-4 flex-wrap max-w-2xl mx-auto">
          {sponsors.map((_, index) => (
            <button key={index} onClick={() => setCurrentSponsor(index)} className={`h-1.5 transition-all duration-700 rounded-full ${currentSponsor === index ? 'w-16 bg-surreal-cyan shadow-[0_0_20px_rgba(0,240,255,0.8)]' : 'w-4 bg-white/10'}`} />
          ))}
        </div>
      </section>

      {/* MAPA */}
      <section className="max-w-5xl mx-auto px-4 py-20 relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl font-black text-white mb-4 flex justify-center items-center gap-3">
            <MapPin className="text-surreal-magenta" size={36} /> Localização
          </h2>
        </motion.div>
        <div className="w-full h-[450px] glass-panel p-2 rounded-[32px] overflow-hidden relative">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.3327064247605!2d-51.143334423921836!3d-23.303684452177638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94eb437a3d1d44af%3A0x9c9f46adfc62d1eb!2sUniCesumar%20-%20Londrina!5e0!3m2!1spt-BR!2sbr!4v1777981365322!5m2!1spt-BR!2sbr" className="w-full h-full border-0 rounded-[24px] filter invert-[90%] hue-rotate-180 contrast-125" allowFullScreen="" loading="lazy"></iframe>
        </div>
      </section>
    </div>
  );
}