import { ShoppingCart, UserCircle, X, Rocket, Zap } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

export const Navbar = () => {
  const { carrinho } = useCart();
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [modalSolutions, setModalSolutions] = useState(false);
  const [modalInnovation, setModalInnovation] = useState(false);

  // Navegação inteligente: vai pra Home e rola até a seção
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
    <>
      <nav className="w-full px-8 py-6 flex justify-between items-center bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl font-bold tracking-wider">NEXORA<span className="text-purple-500">®</span></span>
        </Link>
        
        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-300">
          <button onClick={handleScrollToProducts} className="hover:text-purple-400 transition-colors">Products</button>
          <button onClick={() => setModalSolutions(true)} className="hover:text-purple-400 transition-colors">Solutions</button>
          <button onClick={() => setModalInnovation(true)} className="hover:text-purple-400 transition-colors">Innovation</button>
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

      {/* MODAL CREATIVE: SOLUTIONS */}
      {modalSolutions && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-lg w-full relative shadow-2xl">
            <button onClick={() => setModalSolutions(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24} /></button>
            <div className="text-purple-400 mb-4"><Rocket size={48} /></div>
            <h3 className="text-2xl font-bold text-white mb-2">Nexora Enterprise Solutions</h3>
            <p className="text-slate-400 mb-6">Plataforma robusta para lojistas de alta performance.</p>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3"><CheckIcon /> <b>Logística B2B Integrada:</b> Sincronização em tempo real de estoque com fornecedores parceiros.</li>
              <li className="flex gap-3"><CheckIcon /> <b>Dropshipping Avançado:</b> Automatize seus fluxos de venda e SEO para marketplaces externos sem tocar no produto.</li>
              <li className="flex gap-3"><CheckIcon /> <b>API Aberta:</b> Conecte o Spring Boot com ERPs globais de forma escalável.</li>
            </ul>
          </div>
        </div>
      )}

      {/* MODAL CREATIVE: INNOVATION */}
      {modalInnovation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-lg w-full relative shadow-2xl">
            <button onClick={() => setModalInnovation(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24} /></button>
            <div className="text-blue-400 mb-4"><Zap size={48} /></div>
            <h3 className="text-2xl font-bold text-white mb-2">Nexora Labs</h3>
            <p className="text-slate-400 mb-6">Um vislumbre do futuro da tecnologia vestível e IA.</p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-lime-400 tracking-widest uppercase mb-1 block">EM BREVE</span>
              <h4 className="text-white font-bold">Nexora Neural Glass</h4>
              <p className="text-sm text-slate-500 mt-2">Óculos de realidade mista com integração direta à nossa IA de análise de ambientes. Chegando no Q4.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const CheckIcon = () => <span className="text-purple-500">✔</span>;