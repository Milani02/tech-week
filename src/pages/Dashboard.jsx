import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Users, Mic, FolderKanban, LogOut, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('participantes');
  const [data, setData] = useState({ participantes: [], palestrantes: [], projetos: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [pRes, sRes, prRes] = await Promise.all([
      supabase.from('participants').select('*').order('created_at', { ascending: false }),
      supabase.from('speakers').select('*').order('created_at', { ascending: false }),
      supabase.from('projects').select('*').order('created_at', { ascending: false })
    ]);

    setData({
      participantes: pRes.data || [],
      palestrantes: sRes.data || [],
      projetos: prRes.data || []
    });
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const updateSpeakerStatus = async (id, newStatus) => {
    const { error } = await supabase.from('speakers').update({ status: newStatus }).eq('id', id);
    if (!error) fetchData();
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-purple-400">Carregando painel...</div>;

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden text-white">
      
      {/* EFEITOS DE FUNDO DO DASHBOARD (Grid e Brilho Roxo) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0a0a]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/20 blur-[120px] rounded-[100%]"></div>
      </div>

      {/* CONTEÚDO DO DASHBOARD */}
      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Header Admin */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Painel de Controle
          </h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors bg-red-400/10 hover:bg-red-400/20 border border-red-400/20 px-4 py-2 rounded-lg backdrop-blur-md">
            <LogOut size={20} /> Sair do Sistema
          </button>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard title="Participantes" count={data.participantes.length} icon={<Users size={24} />} color="text-cyan-400" bgColor="bg-cyan-400/10" borderColor="border-cyan-400/20" />
          <MetricCard title="Palestrantes" count={data.palestrantes.length} icon={<Mic size={24} />} color="text-purple-400" bgColor="bg-purple-400/10" borderColor="border-purple-400/20" />
          <MetricCard title="Projetos" count={data.projetos.length} icon={<FolderKanban size={24} />} color="text-pink-400" bgColor="bg-pink-400/10" borderColor="border-pink-400/20" />
        </div>

        {/* Navegação Interna */}
        <div className="flex gap-2 mb-6 border-b border-white/10 pb-4 overflow-x-auto">
          {['participantes', 'palestrantes', 'projetos'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg font-medium capitalize whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-purple-600/80 to-cyan-600/80 text-white border border-white/20 shadow-[0_0_15px_rgba(150,0,255,0.2)]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tabelas de Dados */}
        <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 overflow-x-auto shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-white/5 text-gray-300 border-b border-white/10">
              {activeTab === 'participantes' && (
                <tr><th className="p-4 font-semibold">Nome</th><th className="p-4 font-semibold">RA</th><th className="p-4 font-semibold">Curso/Série</th><th className="p-4 font-semibold">Coffee Break</th></tr>
              )}
              {activeTab === 'palestrantes' && (
                <tr><th className="p-4 font-semibold">Nome</th><th className="p-4 font-semibold">Tema</th><th className="p-4 font-semibold">Contato</th><th className="p-4 font-semibold">Status</th><th className="p-4 font-semibold">Ações</th></tr>
              )}
              {activeTab === 'projetos' && (
                <tr><th className="p-4 font-semibold">Projeto</th><th className="p-4 font-semibold">Responsável</th><th className="p-4 font-semibold">RA</th></tr>
              )}
            </thead>
            <tbody className="divide-y divide-white/5">
              {activeTab === 'participantes' && data.participantes.map(p => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white">{p.nome}</td><td className="p-4 text-cyan-200">{p.ra}</td><td className="p-4">{p.curso} - {p.serie}</td>
                  <td className="p-4">{p.coffee_break ? <span className="text-green-400 bg-green-400/10 px-2 py-1 rounded-full text-xs">Sim</span> : <span className="text-gray-500">Não</span>}</td>
                </tr>
              ))}

              {activeTab === 'palestrantes' && data.palestrantes.map(s => (
                <tr key={s.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-white">{s.nome}</td><td className="p-4">{s.tema}</td>
                  <td className="p-4">{s.email}<br/><span className="text-xs text-purple-300">{s.telefone}</span></td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs border ${
                      s.status === 'aprovado' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                      s.status === 'rejeitado' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                      'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    }`}>
                      {s.status || 'pendente'}
                    </span>
                  </td>
                  <td className="p-4 flex gap-3">
                    <button onClick={() => updateSpeakerStatus(s.id, 'aprovado')} className="text-green-400 hover:text-green-300 hover:scale-110 transition-transform" title="Aprovar"><CheckCircle size={20}/></button>
                    <button onClick={() => updateSpeakerStatus(s.id, 'rejeitado')} className="text-red-400 hover:text-red-300 hover:scale-110 transition-transform" title="Rejeitar"><XCircle size={20}/></button>
                  </td>
                </tr>
              ))}

              {activeTab === 'projetos' && data.projetos.map(pr => (
                <tr key={pr.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-white">{pr.nome_projeto}</td><td className="p-4 text-purple-200">{pr.nome_aluno}</td><td className="p-4">{pr.ra}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {data[activeTab].length === 0 && <div className="p-8 text-center text-gray-500">Nenhum registro encontrado no banco de dados.</div>}
        </div>

      </div>
    </div>
  );
}

// Componente de Métrica adaptado para o novo visual Glassmorphism
function MetricCard({ title, count, icon, color, bgColor, borderColor }) {
  return (
    <div className={`bg-black/40 backdrop-blur-xl p-6 rounded-xl border ${borderColor} flex items-center justify-between shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-1`}>
      <div>
        <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">{title}</p>
        <p className={`text-4xl font-black mt-2 ${color}`}>{count}</p>
      </div>
      <div className={`p-4 rounded-xl ${bgColor} ${color}`}>
        {icon}
      </div>
    </div>
  );
}