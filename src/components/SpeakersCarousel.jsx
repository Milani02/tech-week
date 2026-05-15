import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Cpu, Globe, GraduationCap } from 'lucide-react';

// IMPORTAÇÃO DAS FOTOS
import imgGustavo from '../assets/gustavo.jpeg';
import imgJessy from '../assets/jessy.jpeg';
import imgLuciano from '../assets/luciano.png';
import imgMichel from '../assets/michel.png';
import imgLuiz from '../assets/luiz.png';

const speakers = [
  {
    name: "Gustavo Melles",
    talk: "Pense com IA: A Revolução da Inteligência Ampliada",
    role: "Fundador BuscaIA.com & Professor MBA PUCPR",
    bio: "Especialista em Marketing pela Mackenzie, colunista CBN e atuação em marcas como Uber, Toyota e Cirque du Soleil.",
    image: imgGustavo,
    date: "01/06 - 19:15",
    color: "from-surreal-cyan to-blue-500"
  },
  {
    name: "Jessy Borges Ferracioli",
    talk: "Os data taggers e o trabalho invisível por trás da IA",
    role: "Mestre em Direito, Sociedade e Tecnologia",
    bio: "Pesquisadora na Lawgorithm (IA e Raça). Advogada especialista em licitações e Direito Civil.",
    image: imgJessy,
    date: "01/06 - 20:30",
    color: "from-surreal-magenta to-pink-600"
  },
  {
    name: "Luciano Soler",
    talk: "Construção e Orquestração de Agentes de IA",
    role: "Mestre em Ciência da Computação - IDR-Paraná",
    bio: "Engenheiro de Computação e Especialista em Software. Atua no desenvolvimento de IA aplicada ao agronegócio.",
    image: imgLuciano,
    date: "02/06 - 19:15",
    color: "from-yellow-400 to-orange-500"
  },
  {
    name: "Michel Cesar Leme",
    talk: "O programador morreu. Vida longa ao programador",
    role: "CTO na Leanwork Group",
    bio: "Arquiteto de Software com 20 anos de experiência. Liderou times técnicos em gigantes como Centauro e Riachuelo.",
    image: imgMichel,
    date: "02/06 - 20:30",
    color: "from-green-400 to-emerald-600"
  },
  {
    name: "Luiz Fernando Nunes",
    talk: "IA e Proteção de Dados: Desafios, Ética e Segurança",
    role: "Líder na Hanke Digital Solutions",
    bio: "Mestre em Computação e Direito. 15 anos de experiência em gestão de projetos ágeis e multinacionais.",
    image: imgLuiz,
    date: "03/06 - 19:15",
    color: "from-surreal-purple to-indigo-600"
  }
];

export default function SpeakersCarousel() {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    const { current } = carouselRef;
    const scrollAmount = 340;
    if (direction === 'left') {
      current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-surreal-bg overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-surreal-cyan rounded-full blur-[120px]"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-surreal-magenta rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
              Speaker <span className="text-surreal-cyan">Grid</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-surreal-cyan to-transparent mt-2"></div>
            <p className="text-gray-400 mt-4 max-w-md font-medium">Conheça os especialistas que estarão na linha de frente.</p>
          </motion.div>

          <div className="flex gap-3">
            <button onClick={() => scroll('left')} className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-surreal-cyan hover:text-black transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scroll('right')} className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-surreal-cyan hover:text-black transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div ref={carouselRef} className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          {speakers.map((speaker, index) => (
            <motion.div key={index} className="min-w-[320px] md:min-w-[380px] snap-center">
              <div className="glass-panel p-6 rounded-[32px] h-full flex flex-col border border-white/10 hover:border-white/30 transition-all duration-500 group relative">
                <div className="absolute top-4 right-6 z-30">
                  <span className="text-[10px] font-black tracking-widest uppercase py-1 px-3 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">{speaker.date}</span>
                </div>
                <div className="relative mb-6">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${speaker.color} rounded-2xl opacity-20 blur group-hover:opacity-40 transition duration-500`}></div>
                  <div className="relative h-64 overflow-hidden rounded-2xl border border-white/5">
                    <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className={`text-sm font-bold uppercase tracking-widest mb-1 bg-clip-text text-transparent bg-gradient-to-r ${speaker.color}`}>{speaker.role}</h4>
                  <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{speaker.name}</h3>
                  <div className="flex gap-2 mb-4">
                    <Cpu size={16} className="text-surreal-cyan" />
                    <p className="text-sm font-bold text-gray-200 leading-tight">{speaker.talk}</p>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-3 italic pl-4 border-l-2 border-white/10">"{speaker.bio}"</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.scrollbar-hide::-webkit-scrollbar { display: none; }` }} />
    </section>
  );
}