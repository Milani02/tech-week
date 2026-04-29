import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-tech-bg flex items-center justify-center px-4">
      <div className="bg-tech-card p-8 rounded-2xl border border-gray-700 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Acesso Restrito</h2>
        
        {error && <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-tech-primary outline-none" 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-tech-primary outline-none" 
              required 
            />
          </div>
          <button type="submit" className="w-full bg-tech-primary hover:bg-violet-600 text-white font-bold py-3 rounded-lg transition-colors mt-4">
            Entrar no Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}