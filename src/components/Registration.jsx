import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function Registration() {
  const [activeTab, setActiveTab] = useState('participante');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let tableName = '';
    
    if (activeTab === 'participante') tableName = 'participants';
    if (activeTab === 'palestrante') tableName = 'speakers';
    if (activeTab === 'projeto') tableName = 'projects';

    const { error } = await supabase.from(tableName).insert([data]);

    setLoading(false);
    if (!error) {
      setSuccessMsg('Inscrição confirmada com sucesso!');
      reset();
      setTimeout(() => setSuccessMsg(''), 5000);
    } else {
      alert('Erro ao realizar inscrição: ' + error.message);
    }
  };

  const tabs = [
    { id: 'participante', label: 'Sou Participante' },
    { id: 'palestrante', label: 'Quero Palestrar' },
    { id: 'projeto', label: 'Apresentar Projeto' }
  ];

  return (
    <section id="inscricao" className="py-20 bg-surreal-bg relative z-20">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        {/* CORREÇÃO VISUAL: Aplicando glass-panel e estilização surreal */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="glass-panel p-8 md:p-12 rounded-[32px] shadow-2xl relative overflow-hidden"
        >
          {/* Efeito de brilho de fundo para o formulário */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-surreal-purple/10 rounded-full mix-blend-screen blur-[100px] pointer-events-none"></div>

          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white tracking-tight leading-none mb-3">
              Garante sua Conexão
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">Escolha o seu ponto de entrada para a Tech Week 2026. A conexão com o futuro começa aqui.</p>
          </div>

          {/* Sistema de Abas (Tabs) Surreal */}
          <div className="flex flex-wrap gap-2 justify-center mb-10 bg-black/30 p-2 rounded-2xl border border-white/5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); reset(); setSuccessMsg(''); }}
                className={`relative px-6 py-2 rounded-xl font-medium transition-colors text-sm uppercase tracking-widest ${
                  activeTab === tab.id ? 'text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Formulários dinâmicos com inputs de nível profissional */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
              >
                {/* CAMPOS PARTICIPANTE */}
                {activeTab === 'participante' && (
                  <>
                    <InputField label="Nome Completo" name="nome" register={register} />
                    <InputField label="RA" name="ra" register={register} />
                    <InputField label="Curso" name="curso" register={register} />
                    <InputField label="Série/Período" name="serie" register={register} />
                    <div className="md:col-span-2 flex items-center mt-3 p-4 glass-panel border-white/5 rounded-2xl">
                      <input type="checkbox" {...register("coffee_break")} id="coffee" className="w-5 h-5 accent-surreal-cyan bg-gray-900 border-white/10" />
                      <label htmlFor="coffee" className="ml-3 text-gray-300">Vou participar do Coffee Break para networking e snacks surreais.</label>
                    </div>
                  </>
                )}

                {/* CAMPOS PALESTRANTE */}
                {activeTab === 'palestrante' && (
                  <>
                    <InputField label="Nome Completo" name="nome" register={register} />
                    <InputField label="Telefone" name="telefone" register={register} />
                    <InputField label="E-mail" name="email" register={register} type="email" />
                    <InputField label="Tema da Palestra" name="tema" register={register} />
                    <TextAreaField label="Breve Currículo" name="curriculo" register={register} className="md:col-span-2" rows="3" />
                    <TextAreaField label="Briefing da Palestra" name="briefing" register={register} className="md:col-span-2" rows="3" />
                    <div className="md:col-span-2 glass-panel p-4 rounded-2xl border-white/5">
                      <label className="block text-sm text-gray-400 mb-2">Tempo Estimado (minutos)</label>
                      <input type="number" {...register("tempo")} min="40" max="60" required className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-surreal-purple outline-none transition focus:ring-1 focus:ring-surreal-purple" />
                      <p className="text-xs text-gray-600 mt-1.5">Mínimo 40 min, Máximo 60 min. Mantenha o fluxo de conhecimento dinâmico.</p>
                    </div>
                  </>
                )}

                {/* CAMPOS PROJETO */}
                {activeTab === 'projeto' && (
                  <>
                    <InputField label="Nome do Aluno Responsável" name="nome_aluno" register={register} />
                    <InputField label="RA" name="ra" register={register} />
                    <InputField label="Nome do Projeto" name="nome_projeto" register={register} className="md:col-span-2" />
                    <TextAreaField label="Descrição do Projeto" name="descricao" register={register} className="md:col-span-2" rows="4" />
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading}
              className="w-full mt-10 bg-gradient-to-r from-surreal-purple via-surreal-cyan to-surreal-magenta hover:animate-gradient-x text-white font-bold py-4 rounded-xl transition-shadow flex justify-center shadow-[0_0_30px_rgba(138,43,226,0.5)]"
            >
              {loading ? 'Validando Conexão...' : 'Confirmar Inscrição'}
            </motion.button>

            {successMsg && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-center mt-5 font-semibold text-lg drop-shadow-lg">
                {successMsg}
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

// Subcomponentes para inputs surreais
function InputField({ label, name, register, type = "text", className = "" }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-400 mb-1.5">{label}</label>
      <input 
        type={type} 
        {...register(name)} 
        required 
        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-surreal-cyan outline-none transition focus:ring-1 focus:ring-surreal-cyan antialiased" 
      />
    </div>
  );
}

function TextAreaField({ label, name, register, className = "", rows = "4" }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-400 mb-1.5">{label}</label>
      <textarea 
        {...register(name)} 
        required 
        rows={rows} 
        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-surreal-magenta outline-none transition focus:ring-1 focus:ring-surreal-magenta antialiased"
      ></textarea>
    </div>
  );
}