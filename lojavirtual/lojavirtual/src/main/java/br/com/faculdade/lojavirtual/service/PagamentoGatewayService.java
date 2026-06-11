package br.com.faculdade.lojavirtual.service;

import org.springframework.stereotype.Service;

import br.com.faculdade.lojavirtual.dto.PagamentoResponse;

import java.util.UUID;

@Service
public class PagamentoGatewayService {

    public PagamentoResponse gerarCobrancaPix(double valor, String cpf) {
        simularDelayRede();
        String hashPix = "00020101021126580014br.gov.bcb.pix0136" + UUID.randomUUID().toString() + "5204000053039865405" + valor + "5802BR5910LOJAVIRTUAL6009SAOPAULO62070503***6304";
        return new PagamentoResponse(true, "PIX Gerado com Sucesso. Aguardando pagamento.", hashPix);
    }

    public PagamentoResponse validarCartaoCredito(String numeroCartao, String nomeTitular, String cvv, double valor) {
        simularDelayRede();
        
        if (numeroCartao == null || numeroCartao.length() < 13 || numeroCartao.length() > 16) {
            return new PagamentoResponse(false, "Cartão inválido ou reprovado pela operadora.", null);
        }
        
        if (cvv == null || cvv.length() != 3) {
            return new PagamentoResponse(false, "Código CVV inválido.", null);
        }

        String transacaoId = "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return new PagamentoResponse(true, "Pagamento aprovado na operadora.", transacaoId);
    }

    private void simularDelayRede() {
        try {
            Thread.sleep(1500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}