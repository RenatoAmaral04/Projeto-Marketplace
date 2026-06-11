import { Hero } from '../assets/components/sections/Hero';
import { useCart } from '../hooks/useCart';
import { Headphones, Watch, Laptop, Smartphone, Speaker, Camera, Tv, ArrowRight } from 'lucide-react';
import { Produto } from '../types/Produto';

export const Home = () => {
  const { adicionarAoCarrinho } = useCart();

  // Catálogo completo de gadgets para testar o fluxo perfeitamente
  const produtosMock: Produto[] = [
    { id: 1, nome: "Nexora Buds Pro", descricao: "Fones de ouvido com cancelamento de ruído ativo", preco: 129.0, estoque: 10 },
    { id: 2, nome: "Nexora Watch X", descricao: "Smartwatch premium com tela AMOLED", preco: 199.0, estoque: 5 },
    { id: 3, nome: "Nexora Laptop Air", descricao: "Notebook ultra fino para desenvolvedores", preco: 999.0, estoque: 3 },
    { id: 4, nome: "Nexora Phone 15", descricao: "Smartphone com câmera de 108MP e 256GB", preco: 799.0, estoque: 7 },
    { id: 5, nome: "Nexora SoundBox", descricao: "Caixa de som Bluetooth com som espacial", preco: 89.0, estoque: 12 },
    { id: 6, nome: "Nexora Cam 4K", descricao: "Câmera de ação à prova d'água", preco: 249.0, estoque: 4 },
    { id: 7, nome: "Nexora Smart TV", descricao: "Display gamer 4K de 32 polegadas", preco: 449.0, estoque: 2 }
  ];

  const scrollToProducts = () => {
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Função auxiliar para renderizar o ícone correto baseado no nome do produto
  const renderIcon = (nome: string) => {
    const termo = nome.toLowerCase();
    if (termo.includes('buds')) return <Headphones size={80} strokeWidth={1} />;
    if (termo.includes('watch')) return <Watch size={80} strokeWidth={1} />;
    if (termo.includes('laptop')) return <Laptop size={80} strokeWidth={1} />;
    if (termo.includes('phone')) return <Smartphone size={80} strokeWidth={1} />;
    if (termo.includes('soundbox')) return <Speaker size={80} strokeWidth={1} />;
    if (termo.includes('cam')) return <Camera size={80} strokeWidth={1} />;
    return <Tv size={80} strokeWidth={1} />;
  };

  return (
    <div className="pb-20">
      <div onClick={scrollToProducts} className="cursor-pointer">
        <Hero />
      </div>
      
      <section id="produtos" className="px-8 mt-10 pt-10">
        <h2 className="text-xl font-bold tracking-widest text-slate-400 mb-8 border-b border-slate-800 pb-4">
          EXPLORE OUR TOP PICKS
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtosMock.map(produto => (
            <div key={produto.id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 hover:border-purple-500 transition-all group flex flex-col justify-between shadow-xl">
              <div>
                <div className="text-slate-400 mb-6 group-hover:text-purple-400 transition-colors flex justify-center py-4">
                  {renderIcon(produto.nome)}
                </div>
                <h3 className="text-lg font-bold text-slate-200">{produto.nome}</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{produto.descricao}</p>
              </div>
              
              <div className="flex justify-between items-center w-full mt-6 pt-4 border-t border-slate-800/50">
                <span className="text-xl font-bold text-white">R$ {produto.preco.toFixed(2)}</span>
                <button 
                  onClick={() => adicionarAoCarrinho({ produto, quantidade: 1 })}
                  className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-full transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:scale-105"
                  title="Adicionar ao carrinho"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
