import { api } from './api';
import { Pedido } from '../types/Pedido';

export const finalizarCheckoutPix = async (pedido: Pedido, cpf: string): Promise<Pedido> => {
  try {
    // Chama exatamente o endpoint do seu PedidoController.java
    const response = await api.post<Pedido>(`/pedidos/checkout-pix?cpf=${cpf}`, pedido);
    return response.data;
  } catch (error) {
    console.error("Erro ao processar pagamento:", error);
    throw error;
  }
};