import { useEffect, useState } from 'react';
import { DollarSign, ShoppingBag, Activity, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { obterRelatorioVendas, RelatorioVendas } from '../services/relatorio.service';

export const Dashboard = () => {
  const [relatorio, setRelatorio] = useState<RelatorioVendas | null>(null);
  const [loading, setLoading] = useState(true);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const dados = await obterRelatorioVendas();
      setRelatorio(dados);
    } catch (error) {
      alert("Erro ao buscar os dados do servidor Spring Boot.");
    } finally {
      setLoading(false);
    }
  };

  // O useEffect faz o React puxar os dados automaticamente quando a tela abre
  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <Link to="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors mb-4 w-fit">
              <ArrowLeft size={20} /> Voltar para a Loja
            </Link>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Painel de Vendas
            </h1>
            <p className="text-slate-400 mt-2">Visão geral do faturamento da Nexora Tech</p>
          </div>
          
          <button 
            onClick={carregarDados}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-700 transition-colors"
          >
            <RefreshCw size={18} className={loading ? "animate-spin text-purple-400" : "text-purple-400"} />
            Atualizar Dados
          </button>
        </div>

        {loading && !relatorio ? (
          <div className="text-center text-slate-400 py-20 animate-pulse">Sincronizando com o banco H2...</div>
        ) : relatorio ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card Faturamento */}
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10"><DollarSign size={100} /></div>
              <div className="flex items-center gap-4 mb-4 text-purple-400">
                <div className="p-3 bg-purple-500/10 rounded-xl"><DollarSign size={24} /></div>
                <h3 className="text-lg font-bold text-slate-300">Faturamento Total</h3>
              </div>
              <p className="text-5xl font-bold text-white">
                R$ {relatorio.faturamento_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>

            {/* Card Pedidos */}
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10"><ShoppingBag size={100} /></div>
              <div className="flex items-center gap-4 mb-4 text-blue-400">
                <div className="p-3 bg-blue-500/10 rounded-xl"><ShoppingBag size={24} /></div>
                <h3 className="text-lg font-bold text-slate-300">Pedidos Realizados</h3>
              </div>
              <p className="text-5xl font-bold text-white">
                {relatorio.total_pedidos_realizados}
              </p>
            </div>

            {/* Card Status */}
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10"><Activity size={100} /></div>
              <div className="flex items-center gap-4 mb-4 text-lime-400">
                <div className="p-3 bg-lime-500/10 rounded-xl"><Activity size={24} /></div>
                <h3 className="text-lg font-bold text-slate-300">Status da API</h3>
              </div>
              <p className="text-4xl font-bold text-lime-400 mt-2">
                {relatorio.status}
              </p>
            </div>

          </div>
        ) : (
          <div className="text-red-400">Nenhum dado encontrado.</div>
        )}
      </div>
    </div>
  );
};