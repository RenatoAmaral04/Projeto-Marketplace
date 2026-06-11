import { Produto } from "./Produto";

export interface ItemPedido {
  produto: Produto;
  quantidade: number;
}

export interface Pedido {
  id?: number;
  itens: ItemPedido[];
  valorTotal: number;
  status?: string;
  codigoPagamentoExtra?: string;
}