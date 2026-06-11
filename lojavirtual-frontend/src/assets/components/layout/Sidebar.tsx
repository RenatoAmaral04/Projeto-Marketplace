import { Home, Grid, Box, Headphones, User, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

export const Sidebar = () => {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToProducts = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="w-20 bg-slate-950 border-r border-slate-800 flex flex-col items-center py-8 gap-8 hidden md:flex shadow-2xl z-40">
      <Link to="/" className="p-3 bg-purple-600 rounded-xl mb-4 text-white hover:bg-purple-500 transition-colors cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.4)]">
        <Home size={24} />
      </Link>
      
      <button onClick={handleScrollToProducts} className="text-slate-500 hover:text-purple-400 transition-colors cursor-pointer">
        <Grid size={24} />
      </button>
      
      {usuario?.perfil === 'PERFIL_ADMIN' && (
        <Link to="/dashboard" className="text-slate-500 hover:text-purple-400 transition-colors cursor-pointer" title="Dashboard">
          <Box size={24} />
        </Link>
      )}

      <button onClick={handleScrollToProducts} className="text-slate-500 hover:text-purple-400 transition-colors cursor-pointer">
        <Headphones size={24} />
      </button>
      
      <div className="mt-auto flex flex-col gap-4">
        {usuario ? (
          <button onClick={logout} className="text-red-500 hover:text-red-400 transition-colors cursor-pointer" title="Sair">
            <LogOut size={24} />
          </button>
        ) : (
          <Link to="/login" className="text-slate-500 hover:text-lime-400 transition-colors cursor-pointer" title="Fazer Login">
            <User size={24} />
          </Link>
        )}
      </div>
    </aside>
  );
};