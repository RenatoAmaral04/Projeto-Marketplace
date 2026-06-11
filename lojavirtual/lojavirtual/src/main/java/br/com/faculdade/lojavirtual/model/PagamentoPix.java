package br.com.faculdade.lojavirtual.model;

import br.com.faculdade.lojavirtual.dto.PagamentoResponse;
import br.com.faculdade.lojavirtual.service.PagamentoGatewayService;

public class PagamentoPix implements FormaPagamento {
    
    private String cpf;

    public PagamentoPix(String cpf) {
        this.cpf = cpf;
    }

    @Override
    public PagamentoResponse processar(double valor, PagamentoGatewayService gateway) {
       
        return gateway.gerarCobrancaPix(valor, cpf);
    }

    public String getCpf() {
        return cpf;
    }
}