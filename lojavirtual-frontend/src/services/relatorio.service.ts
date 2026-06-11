import { api } from './api';

// Essa interface espelha exatamente o JSON que o seu Java envia
export interface RelatorioVendas {
  faturamento_total: number;
  total_pedidos_realizados: number;
  status: string;
}

export const obterRelatorioVendas = async (): Promise<RelatorioVendas> => {
  try {
    const response = await api.get<RelatorioVendas>('/relatorios/vendas');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar relatório", error);
    throw error;
  }
};