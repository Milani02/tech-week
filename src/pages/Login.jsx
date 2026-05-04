import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redireciona se já estiver logado
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/admin');
      }
    });
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Credenciais inválidas.');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 overflow-hidden">
      
      {/* VÍDEO DE BACKGROUND EM LOOP */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 mix-blend-screen pointer-events-none"
      >
        <source src="/hero2.mp4" type="video/mp4" />
      </video>

      {/* OVERLAYS: Gradiente e Grid Cibernético para escurecer o fundo e dar textura */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0a0a] z-0 pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      {/* CARD DE LOGIN (z-10 para ficar acima do fundo) */}
      <div className="relative z-10 bg-black/40 backdrop-blur-xl p-8 rounded-2xl border border-white/10 w-full max-w-md shadow-[0_0_40px_rgba(150,0,255,0.15)]">
        <h2 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-8 tracking-tight">
          Painel Administrativo
        </h2>
        
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm text-center backdrop-blur-md">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2 font-semibold">E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none" 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2 font-semibold">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none" 
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-3.5 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(150,0,255,0.3)] mt-4"
          >
            Iniciar Sessão
          </button>
        </form>
      </div>
    </div>
  );
}