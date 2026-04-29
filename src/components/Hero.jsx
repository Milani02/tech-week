import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();

  // DEFININDO O EFEITO PARALAXE
  const yTitle = useTransform(scrollY, [0, 1000], [0, 400]);
  const yParagraph = useTransform(scrollY, [0, 1000], [0, 150]);
  const yButtons = useTransform(scrollY, [0, 1000], [0, 50]);
  const yOrbs = useTransform(scrollY, [0, 1000], [0, -100]);

  const opacityText = useTransform(scrollY, [0, 600], [1, 0]);
  
  // NOVO: Faz o indicador de Scroll sumir rápido assim que a rolagem começa
  const opacityScroll = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-surreal-bg">
      
      {/* VÍDEO DE BACKGROUND EFEITO SCREEN */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 mix-blend-screen pointer-events-none"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Máscara de Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-surreal-bg/30 via-surreal-bg/70 to-surreal-bg z-0 pointer-events-none"></div>

      {/* Orbes de luz surreais que se movem com o paralaxe */}
      <motion.div style={{ y: yOrbs }} className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-surreal-purple rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob pointer-events-none"></motion.div>
      <motion.div style={{ y: yOrbs }} className="absolute bottom-1/4 left-1/3 w-[45vw] h-[45vw] bg-surreal-magenta rounded-full mix-blend-screen filter blur-[130px] opacity-30 animate-blob pointer-events-none" style={{ animationDelay: '4s' }}></motion.div>

      {/* Grid Cibernético Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none"></div>

      {/* CONTEÚDO PRINCIPAL - Adicionado pb-32 para dar espaço de respiração na base */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center pb-32">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-surreal-cyan/30 shadow-[0_0_20px_#00F0FF10]"
        >
          <span className="w-2 h-2 rounded-full bg-surreal-cyan animate-pulse shadow-[0_0_10px_#00F0FF]"></span>
          <span className="text-sm font-medium tracking-widest text-surreal-cyan uppercase">Nova Era Tecnológica</span>
        </motion.div>

        <motion.h1 
          style={{ y: yTitle, opacity: opacityText }}
          className="text-7xl md:text-[9.5rem] leading-none font-black tracking-tighter mb-7"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block text-white drop-shadow-2xl">TECH</span>
          <span className="block text-transparent bg-clip-text bg-surreal-gradient animate-gradient-x pb-5">
            WEEK
          </span>
        </motion.h1>
        
        <motion.p 
          style={{ y: yParagraph, opacity: opacityText }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed mb-14 drop-shadow-lg antialiased"
        >
          Ultrapasse os limites do desenvolvimento. Uma imersão profunda em <span className="text-white font-semibold">código, infraestrutura e inovação.</span>
        </motion.p>

        <motion.div
          style={{ y: yButtons, opacity: opacityText }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 relative"
        >
          <div className="absolute inset-0 bg-surreal-cyan blur-3xl opacity-20 rounded-full"></div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('inscricao').scrollIntoView({ behavior: 'smooth' })}
            className="relative px-10 py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden group transition-all duration-300 shadow-[0_0_40px_rgba(0,240,255,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Iniciar Conexão <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 rounded-full font-bold text-lg glass-panel hover:bg-white/10 transition-colors duration-300 border border-white/10"
          >
            Ver Manifesto
          </motion.button>
        </motion.div>
      </div>

      {/* Indicador de Scroll Animado - Envolvido em um controlador de opacidade dinâmico */}
      <motion.div 
        style={{ opacity: opacityScroll }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-surreal-cyan/70 font-semibold antialiased">Scroll</span>
          <div className="w-[1px] h-10 bg-white/10 relative overflow-hidden">
            <motion.div 
              className="w-full h-1/2 bg-surreal-cyan absolute top-0 shadow-[0_0_10px_#00F0FF]"
              animate={{ top: ['-50%', '150%'] }}
              transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}