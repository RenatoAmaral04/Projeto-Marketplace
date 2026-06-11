import { useContext, useState } from 'react';
import { QrCode, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { finalizarCheckoutPix } from '../services/pedido.service';
import { Pedido } from '../types/Pedido';

export const Checkout = () => {
  const { carrinho, valorTotal, limparCarrinho } = useContext(CartContext);
  const [cpf, setCpf] = useState('');
  const [pedidoFinalizado, setPedidoFinalizado] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePagarComPix = async () => {
    try {
      setLoading(true);
      const pedidoParaEnviar: Pedido = {
        itens: carrinho,
        valorTotal: valorTotal
      };
      
      const resposta = await finalizarCheckoutPix(pedidoParaEnviar, cpf);
      setPedidoFinalizado(resposta);
      limparCarrinho();
      
    } catch (error) {
      alert("Erro de comunicação com o Java. O Spring Boot está rodando?");
    } finally {
      setLoading(false);
    }
  };

  if (pedidoFinalizado && pedidoFinalizado.codigoPagamentoExtra) {
    // API que transforma o código PIX do backend em uma imagem real de QR Code
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pedidoFinalizado.codigoPagamentoExtra)}&color=a855f7&bgcolor=0f172a`;

    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-10">
        <CheckCircle size={80} className="text-green-400 mb-6 drop-shadow-[0_0_20px_rgba(74,222,128,0.4)]" />
        <h2 className="text-3xl font-bold mb-2">Pedido Efetuado!</h2>
        <p className="text-slate-400 mb-8">Status: <span className="font-bold text-purple-400">{pedidoFinalizado.status}</span></p>
        
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center max-w-md shadow-2xl">
          <p className="text-sm font-bold text-slate-300 mb-6 uppercase tracking-widest">Escaneie para pagar</p>
          
          <div className="bg-slate-950 p-4 rounded-xl inline-block mb-6 border border-slate-800">
            <img src={qrCodeUrl} alt="QR Code PIX" className="w-48 h-48 rounded-lg" />
          </div>

          <p className="text-xs text-slate-500 mb-2">Ou use o Pix Copia e Cola:</p>
          <code className="bg-slate-950 p-4 rounded-lg block text-xs break-all text-purple-300 border border-slate-800">
            {pedidoFinalizado.codigoPagamentoExtra}
          </code>
        </div>

        <Link to="/" className="mt-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft size={16} /> Voltar para a loja
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10 flex flex-col items-center">
      <div className="w-full max-w-md mb-8">
        <Link to="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors w-fit">
          <ArrowLeft size={20} /> Voltar
        </Link>
      </div>
      
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 w-full max-w-md shadow-2xl">
        <div className="mb-8">
          <p className="text-slate-400 mb-2 font-medium">Resumo da compra</p>
          <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            R$ {valorTotal.toFixed(2)}
          </p>
          <p className="text-sm text-slate-500 mt-3">Itens no carrinho: {carrinho.length}</p>
        </div>

        <div className="mb-8">
          <label className="block text-slate-300 text-sm font-bold mb-3">CPF para Nota Fiscal</label>
          <input 
            type="text" 
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <button 
          onClick={handlePagarComPix}
          disabled={carrinho.length === 0 || !cpf || loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
        >
          {loading ? (
            <span className="animate-pulse">Processando no Java...</span>
          ) : (
            <>
              <QrCode size={22} />
              Gerar PIX
            </>
          )}
        </button>
      </div>
    </div>
  );
};