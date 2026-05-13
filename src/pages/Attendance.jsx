import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Attendance() {
  const [ra, setRa] = useState('');
  const [palestra, setPalestra] = useState('');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);
  const [isEventTime, setIsEventTime] = useState(false);
  const navigate = useNavigate();

  // Datas do evento: 1, 2 e 3 de Junho, a partir das 19h
  // Meses no JavaScript começam no 0 (Janeiro = 0, Junho = 5)
  const EVENT_START = new Date(2026, 5, 1, 19, 0); 
  const EVENT_END = new Date(2026, 5, 3, 23, 59);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      if (now >= EVENT_START && now <= EVENT_END) {
        setIsEventTime(true);
      } else {
        setIsEventTime(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Checa a cada minuto
    
    return () => clearInterval(interval);
  }, []);

  const palestrasDisponiveis = [
    "Automação de Workflows e IA",
    "Red Team: Estratégias de Segurança",
    "Apresentação de Projetos"
  ];

  const handleAttendance = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    const { data: participante, error: searchError } = await supabase
      .from('participants')
      .select('id, nome')
      .eq('ra', ra)
      .single();

    if (searchError || !participante) {
      setStatus({ type: 'error', msg: 'RA não encontrado. Faça sua inscrição primeiro.' });
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from('attendance')
      .insert([{ participante_id: participante.id, palestra_nome: palestra }]);

    setLoading(false);

    if (insertError) {
      setStatus({ type: 'error', msg: 'Erro ao registrar presença.' });
    } else {
      setStatus({ type: 'success', msg: `Presença confirmada para ${participante.nome}!` });
      setRa('');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 overflow-hidden">
      
      {/* OVERLAYS: Estilo surreal do site */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0a0a] z-0 pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
      
      {/* Orbes de luz decorativos */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-surreal-cyan/10 rounded-full mix-blend-screen blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-surreal-purple/10 rounded-full mix-blend-screen blur-[100px] pointer-events-none"></div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative z-10 glass-panel p-8 md:p-10 rounded-[32px] border border-white/10 w-full max-w-md shadow-[0_0_40px_rgba(0,240,255,0.15)]"
      >
        
        {!isEventTime ? (
           // TELA DE BLOQUEIO DE HORÁRIO
           <div className="text-center py-6">
             <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.2)]">
               <span className="text-2xl animate-pulse">⏳</span>
             </div>
             <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-surreal-cyan to-surreal-purple mb-4">
               Acesso Restrito
             </h2>
             <p className="text-gray-400 mb-8 leading-relaxed">O portal de presença só será liberado nos dias 1, 2 e 3 de Junho a partir das 19h.</p>
             <button 
               onClick={() => navigate('/')}
               className="w-full px-8 py-3.5 rounded-xl font-bold text-sm glass-panel hover:bg-white/10 transition-colors duration-300 border border-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]"
             >
               Voltar para o Início
             </button>
           </div>
        ) : (
          // FORMULÁRIO DE CHECK-IN LIBERADO
          <>
            <h2 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-surreal-cyan to-surreal-purple mb-2 tracking-tight">Check-in</h2>
            <p className="text-gray-400 text-center mb-8 text-sm">Confirme sua presença para emissão do certificado.</p>
            
            {status.msg && (
              <div className={`p-4 rounded-xl mb-6 text-sm text-center backdrop-blur-md border ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]'}`}>
                {status.msg}
              </div>
            )}

            <form onSubmit={handleAttendance} className="space-y-5">
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2 font-semibold">Seu RA</label>
                <input 
                  type="text" 
                  value={ra}
                  onChange={(e) => setRa(e.target.value)}
                  placeholder="Ex: 1234567"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-surreal-cyan focus:ring-1 focus:ring-surreal-cyan transition-all outline-none antialiased" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2 font-semibold">Evento Atual</label>
                <select 
                  value={palestra} 
                  onChange={(e) => setPalestra(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-surreal-cyan focus:ring-1 focus:ring-surreal-cyan transition-all outline-none appearance-none antialiased"
                  required
                >
                  <option value="" disabled className="bg-surreal-bg">Selecione o evento...</option>
                  {palestrasDisponiveis.map(p => (
                    <option key={p} value={p} className="bg-surreal-bg">{p}</option>
                  ))}
                </select>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-surreal-cyan to-surreal-purple hover:opacity-90 text-white font-bold py-4 rounded-xl transition-shadow mt-6 shadow-[0_0_30px_rgba(0,240,255,0.3)]"
              >
                {loading ? 'Validando Conexão...' : 'Confirmar Presença'}
              </motion.button>
              
              <div className="text-center mt-6">
                <button type="button" onClick={() => navigate('/')} className="text-xs text-gray-500 hover:text-white uppercase tracking-widest transition-colors font-semibold">
                  Voltar para o Início
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}