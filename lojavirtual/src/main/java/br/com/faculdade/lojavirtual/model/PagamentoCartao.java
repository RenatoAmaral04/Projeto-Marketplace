package br.com.faculdade.lojavirtual.model;

import br.com.faculdade.lojavirtual.dto.PagamentoResponse;
import br.com.faculdade.lojavirtual.service.PagamentoGatewayService;

public class PagamentoCartao implements FormaPagamento {
    
    private String numeroCartao;
    private String nomeTitular;
    private String cvv;

    public PagamentoCartao(String numeroCartao, String nomeTitular, String cvv) {
        this.numeroCartao = numeroCartao;
        this.nomeTitular = nomeTitular;
        this.cvv = cvv;
    }

    @Override
    public PagamentoResponse processar(double valor, PagamentoGatewayService gateway) {
        return gateway.validarCartaoCredito(numeroCartao, nomeTitular, cvv, valor);
    }

    public String getNumeroCartao() { return numeroCartao; }
    public String getNomeTitular() { return nomeTitular; }
    public String getCvv() { return cvv; }

}
