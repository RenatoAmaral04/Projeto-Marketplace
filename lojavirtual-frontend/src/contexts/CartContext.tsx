import { createContext, useState, ReactNode } from 'react';
import { ItemPedido } from '../types/Pedido';

interface CartContextData {
  carrinho: ItemPedido[];
  adicionarAoCarrinho: (item: ItemPedido) => void;
  limparCarrinho: () => void;
  valorTotal: number;
}

export const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carrinho, setCarrinho] = useState<ItemPedido[]>([]);

  const adicionarAoCarrinho = (item: ItemPedido) => {
    setCarrinho([...carrinho, item]);
  };

  const limparCarrinho = () => setCarrinho([]);

  const valorTotal = carrinho.reduce((acc, item) => acc + (item.produto.preco * item.quantidade), 0);

  return (
    <CartContext.Provider value={{ carrinho, adicionarAoCarrinho, limparCarrinho, valorTotal }}>
      {children}
    </CartContext.Provider>
  );
};