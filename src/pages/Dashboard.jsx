import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Users, Mic, FolderKanban, LogOut, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('participantes');
  // CORREÇÃO 1: Chaves unificadas em português para casar com o activeTab
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

    // CORREÇÃO 2: Salvando os dados nas chaves em português
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
    if (!error) fetchData(); // Recarrega a tabela após atualizar
  };

  if (loading) return <div className="min-h-screen bg-tech-bg flex items-center justify-center text-tech-primary">Carregando painel...</div>;

  return (
    <div className="min-h-screen bg-tech-bg p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Admin */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">Painel de Controle</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors bg-red-400/10 px-4 py-2 rounded-lg">
            <LogOut size={20} /> Sair do Sistema
          </button>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard title="Participantes" count={data.participantes.length} icon={<Users size={24} />} color="text-blue-400" />
          <MetricCard title="Palestrantes" count={data.palestrantes.length} icon={<Mic size={24} />} color="text-purple-400" />
          <MetricCard title="Projetos" count={data.projetos.length} icon={<FolderKanban size={24} />} color="text-green-400" />
        </div>

        {/* Navegação Interna */}
        <div className="flex gap-2 mb-6 border-b border-gray-800 pb-4 overflow-x-auto">
          {['participantes', 'palestrantes', 'projetos'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium capitalize whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-tech-primary text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tabelas de Dados */}
        <div className="bg-tech-card rounded-xl border border-gray-700 overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-800/50 text-gray-400">
              {activeTab === 'participantes' && (
                <tr><th className="p-4">Nome</th><th className="p-4">RA</th><th className="p-4">Curso/Série</th><th className="p-4">Coffee Break</th></tr>
              )}
              {activeTab === 'palestrantes' && (
                <tr><th className="p-4">Nome</th><th className="p-4">Tema</th><th className="p-4">Contato</th><th className="p-4">Status</th><th className="p-4">Ações</th></tr>
              )}
              {activeTab === 'projetos' && (
                <tr><th className="p-4">Projeto</th><th className="p-4">Responsável</th><th className="p-4">RA</th></tr>
              )}
            </thead>
            <tbody>
              {/* CORREÇÃO 3: Lendo as listas diretamente das chaves em português */}
              {activeTab === 'participantes' && data.participantes.map(p => (
                <tr key={p.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="p-4">{p.nome}</td><td className="p-4">{p.ra}</td><td className="p-4">{p.curso} - {p.serie}</td>
                  <td className="p-4">{p.coffee_break ? <span className="text-green-400">Sim</span> : 'Não'}</td>
                </tr>
              ))}

              {activeTab === 'palestrantes' && data.palestrantes.map(s => (
                <tr key={s.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="p-4 font-medium text-white">{s.nome}</td><td className="p-4">{s.tema}</td>
                  <td className="p-4">{s.email}<br/><span className="text-xs text-gray-500">{s.telefone}</span></td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${s.status === 'aprovado' ? 'bg-green-500/20 text-green-400' : s.status === 'rejeitado' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {s.status || 'pendente'}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => updateSpeakerStatus(s.id, 'aprovado')} className="text-green-400 hover:text-green-300" title="Aprovar"><CheckCircle size={20}/></button>
                    <button onClick={() => updateSpeakerStatus(s.id, 'rejeitado')} className="text-red-400 hover:text-red-300" title="Rejeitar"><XCircle size={20}/></button>
                  </td>
                </tr>
              ))}

              {activeTab === 'projetos' && data.projetos.map(pr => (
                <tr key={pr.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="p-4 font-medium text-white">{pr.nome_projeto}</td><td className="p-4">{pr.nome_aluno}</td><td className="p-4">{pr.ra}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* A validação que estava causando o erro agora funciona 100% */}
          {data[activeTab].length === 0 && <div className="p-8 text-center text-gray-500">Nenhum registro encontrado.</div>}
        </div>

      </div>
    </div>
  );
}

function MetricCard({ title, count, icon, color }) {
  return (
    <div className="bg-tech-card p-6 rounded-xl border border-gray-700 flex items-center justify-between shadow-lg">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className={`text-4xl font-bold mt-2 ${color}`}>{count}</p>
      </div>
      <div className={`p-4 bg-gray-800/50 rounded-xl ${color}`}>
        {icon}
      </div>
    </div>
  );
}