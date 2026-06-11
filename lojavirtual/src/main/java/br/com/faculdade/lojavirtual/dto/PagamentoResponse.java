package br.com.faculdade.lojavirtual.dto;

public class PagamentoResponse {
    private boolean aprovado;
    private String mensagem;
    private String codigoTransacao;

    public PagamentoResponse(boolean aprovado, String mensagem, String codigoTransacao) {
        this.aprovado = aprovado;
        this.mensagem = mensagem;
        this.codigoTransacao = codigoTransacao;
    }

    public boolean isAprovado() {
    	return aprovado;
    }
    
    public String getMensagem() {
    	return mensagem; 
    }
    
    public String getCodigoTransacao() {
    	return codigoTransacao;
    }
}
