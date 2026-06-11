package br.com.faculdade.lojavirtual.model;

import br.com.faculdade.lojavirtual.dto.PagamentoResponse;
import br.com.faculdade.lojavirtual.service.PagamentoGatewayService;

public interface FormaPagamento {
    PagamentoResponse processar(double valor, PagamentoGatewayService gateway);
}