import { ShoppingCart, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

export const Navbar = () => {
  const { carrinho } = useCart();
  const { usuario } = useContext(AuthContext);

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="w-full px-8 py-6 flex justify-between items-center bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <span className="text-2xl font-bold tracking-wider">NEXORA<span className="text-purple-500">®</span></span>
      </Link>
      
      <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-300">
        <button onClick={() => handleScroll('produtos')} className="hover:text-purple-400 transition-colors">Products</button>
        <button onClick={() => handleScroll('produtos')} className="hover:text-purple-400 transition-colors">Solutions</button>
        <button onClick={() => handleScroll('produtos')} className="hover:text-purple-400 transition-colors">Innovation</button>
      </div>

      <div className="flex items-center gap-6">
        {usuario && (
          <span className="text-sm font-bold text-slate-400 flex items-center gap-2">
            <UserCircle className="text-lime-400" size={18} />
            {usuario.nome.split(' ')[0]}
          </span>
        )}
        
        <Link to="/checkout" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-full font-bold transition-all relative shadow-[0_0_10px_rgba(168,85,247,0.3)]">
          <ShoppingCart size={18} />
          <span>Cart</span>
          {carrinho.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-lime-400 text-slate-900 font-extrabold text-xs w-6 h-6 flex items-center justify-center rounded-full">
              {carrinho.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};