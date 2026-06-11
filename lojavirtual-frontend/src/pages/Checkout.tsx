import { useContext, useState, useEffect } from 'react';
import { QrCode, CreditCard, CheckCircle, ArrowLeft, Clock, XCircle, RefreshCw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';

export const Checkout = () => {
  const { carrinho, valorTotal, limparCarrinho } = useContext(CartContext);
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const [metodo, setMetodo] = useState<'PIX' | 'CARTAO'>('PIX');
  const [numeroCartao, setNumeroCartao] = useState('');
  
  const [pixGerado, setPixGerado] = useState(false);
  const [tempoPix, setTempoPix] = useState(20);
  const [statusPedido, setStatusPedido] = useState<'PENDENTE' | 'PAGO' | 'RECUSADO' | null>(null);
  const [processando, setProcessando] = useState(false);

  // Redireciona se não estiver logado
  useEffect(() => {
    if (!usuario) navigate('/login');
  }, [usuario, navigate]);

  // Timer do PIX
  useEffect(() => {
    if (pixGerado && tempoPix > 0 && statusPedido !== 'PAGO') {
      const timer = setTimeout(() => setTempoPix(tempoPix - 1), 1000);
      return () => clearTimeout(timer);
    } else if (tempoPix === 0 && statusPedido !== 'PAGO') {
      setStatusPedido('RECUSADO');
    }
  }, [pixGerado, tempoPix, statusPedido]);

  // FUNÇÃO NOVA: Comunica a venda real para o Spring Boot
  const enviarVendaProJava = async () => {
    setProcessando(true);
    try {
      await fetch('http://localhost:8080/api/pedidos/registrar-venda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valorTotal })
      });
      setStatusPedido('PAGO');
      limparCarrinho();
    } catch (error) {
      alert("Erro ao conectar com o banco de dados. O Spring Boot está rodando?");
    } finally {
      setProcessando(false);
    }
  };

  const handleGerarPix = () => {
    setPixGerado(true);
    setStatusPedido(null);
    setTempoPix(20);
  };

  const handlePagarCartao = () => {
    // Validação de Fraude: Só aceita se for final 1234
    if (numeroCartao.replace(/\D/g, '') === '1234123412341234') {
      enviarVendaProJava();
    } else {
      setStatusPedido('RECUSADO');
      alert("Cartão Recusado pela Operadora. Verifique os dados.");
    }
  };

  if (!usuario) return null;

  // Tela de Sucesso
  if (statusPedido === 'PAGO') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6 text-center">
        <CheckCircle size={80} className="text-lime-400 mb-6 drop-shadow-[0_0_20px_rgba(163,230,53,0.5)]" />
        <h2 className="text-3xl font-bold">Pagamento Aprovado!</h2>
        <p className="text-slate-400 mt-2">Obrigado pela compra, {usuario.nome}. O valor já consta no Relatório da Empresa.</p>
        <Link to="/" className="mt-8 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl transition-all">Voltar para a loja</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10 flex flex-col items-center">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <Link to="/" className="text-slate-500 hover:text-white flex items-center gap-2 mb-6 w-fit"><ArrowLeft size={18}/> Voltar</Link>
        <h2 className="text-2xl font-bold mb-2">Finalizar Compra</h2>
        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-8">
          R$ {valorTotal.toFixed(2)}
        </p>

        {/* Abas de Pagamento */}
        <div className="flex gap-4 mb-8">
          <button onClick={() => { setMetodo('PIX'); setStatusPedido(null); }} className={`flex-1 p-3 rounded-xl flex justify-center items-center gap-2 border transition-colors ${metodo === 'PIX' ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'border-slate-800 text-slate-500'}`}>
            <QrCode size={18} /> PIX
          </button>
          <button onClick={() => { setMetodo('CARTAO'); setStatusPedido(null); }} className={`flex-1 p-3 rounded-xl flex justify-center items-center gap-2 border transition-colors ${metodo === 'CARTAO' ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'border-slate-800 text-slate-500'}`}>
            <CreditCard size={18} /> Cartão
          </button>
        </div>

        {/* --- FLUXO DO PIX --- */}
        {metodo === 'PIX' && (
          <div className="text-center min-h-[250px] flex flex-col justify-center">
            {!pixGerado ? (
              <button onClick={handleGerarPix} className="w-full bg-purple-600 hover:bg-purple-500 py-4 rounded-xl font-bold text-white transition-all">Gerar Código PIX</button>
            ) : statusPedido === 'RECUSADO' ? (
              <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                <div className="text-red-400 flex flex-col items-center gap-2">
                  <XCircle size={50} /> 
                  <p className="font-bold">Código PIX Expirado!</p>
                </div>
                <button onClick={handleGerarPix} className="mt-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 px-6 py-3 rounded-xl text-white font-bold flex items-center gap-2 transition-all">
                  <RefreshCw size={18} /> Gerar Novo PIX
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=NEXORA-PIX-${tempoPix}&color=a855f7&bgcolor=0f172a`} alt="QR Code" className="w-48 h-48 rounded-lg mb-4 shadow-xl" />
                <p className="text-slate-400 flex items-center gap-2 mb-6">
                  <Clock size={16} className="text-purple-400" /> Expira em <span className="text-white font-bold text-xl">{tempoPix}s</span>
                </p>
                <button onClick={enviarVendaProJava} disabled={processando} className="bg-lime-500 hover:bg-lime-400 text-slate-900 font-bold px-6 py-3 rounded-xl w-full transition-all disabled:opacity-50">
                  {processando ? "Validando no Banco..." : 'Simular Botão "O PIX Foi Pago"'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- FLUXO DO CARTÃO --- */}
        {metodo === 'CARTAO' && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            <input type="text" placeholder="Número do Cartão (Use: 1234 1234 1234 1234)" value={numeroCartao} onChange={(e) => setNumeroCartao(e.target.value)} className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:outline-none focus:border-blue-500" />
            <input type="text" placeholder="Nome Impresso no Cartão" className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:outline-none focus:border-blue-500" />
            <div className="flex gap-4">
              <input type="text" placeholder="MM/AA" className="w-1/2 bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:outline-none focus:border-blue-500" />
              <input type="text" placeholder="CVV" className="w-1/2 bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:outline-none focus:border-blue-500" />
            </div>
            <button onClick={handlePagarCartao} disabled={processando} className="w-full bg-blue-600 hover:bg-blue-500 py-4 mt-4 rounded-xl font-bold text-white transition-all disabled:opacity-50">
              {processando ? "Processando Cartão..." : "Pagar com Cartão"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};