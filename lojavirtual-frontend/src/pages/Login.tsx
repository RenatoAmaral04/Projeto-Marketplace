import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    const sucesso = await login(email, senha);
    if (sucesso) {
      navigate('/'); // Volta pra loja se der certo
    } else {
      setErro('Credenciais inválidas. Tente admin@nexora.com ou cliente@email.com (Senha: 1234)');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
      <div className="bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-2">Acesso Nexora</h2>
        <p className="text-slate-400 mb-8">Faça login para continuar.</p>
        
        {erro && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-6 text-sm">{erro}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-slate-500" size={20} />
            <input 
              type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-500" size={20} />
            <input 
              type="password" placeholder="Sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <button type="submit" className="mt-4 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2">
            Entrar <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};