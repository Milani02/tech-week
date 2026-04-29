import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

export default function Attendance() {
  const [ra, setRa] = useState('');
  const [palestra, setPalestra] = useState('');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const palestrasDisponiveis = [
    "Automação de Workflows e IA",
    "Red Team: Estratégias de Segurança",
    "Apresentação de Projetos"
  ];

  const handleAttendance = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    // 1. Verifica se o RA existe na tabela de participantes
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

    // 2. Registra a presença
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
    <div className="min-h-screen bg-tech-bg flex items-center justify-center px-4 bg-hero-pattern">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-tech-card p-8 rounded-2xl border border-gray-700 w-full max-w-md shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tech-primary to-tech-secondary"></div>
        
        <h2 className="text-2xl font-bold text-center text-white mb-2">Check-in do Evento</h2>
        <p className="text-gray-400 text-center mb-8 text-sm">Confirme sua presença para garantir o certificado.</p>
        
        {status.msg && (
          <div className={`p-3 rounded-lg mb-6 text-sm text-center ${status.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
            {status.msg}
          </div>
        )}

        <form onSubmit={handleAttendance} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Seu RA</label>
            <input 
              type="text" 
              value={ra}
              onChange={(e) => setRa(e.target.value)}
              placeholder="Ex: 1234567"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-tech-primary outline-none" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm mb-1">Palestra Atual</label>
            <select 
              value={palestra} 
              onChange={(e) => setPalestra(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-tech-primary outline-none appearance-none"
              required
            >
              <option value="" disabled>Selecione o evento...</option>
              {palestrasDisponiveis.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-tech-primary to-tech-secondary hover:opacity-90 text-white font-bold py-3 rounded-lg transition-opacity mt-4 shadow-lg"
          >
            {loading ? 'Validando...' : 'Confirmar Presença'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}