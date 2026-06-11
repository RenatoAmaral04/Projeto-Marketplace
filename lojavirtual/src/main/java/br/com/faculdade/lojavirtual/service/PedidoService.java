package br.com.faculdade.lojavirtual.service;

import br.com.faculdade.lojavirtual.*;
import br.com.faculdade.lojavirtual.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.faculdade.lojavirtual.dto.PagamentoResponse;
import br.com.faculdade.lojavirtual.model.FormaPagamento;
import br.com.faculdade.lojavirtual.model.ItemPedido;
import br.com.faculdade.lojavirtual.model.PagamentoPix;
import br.com.faculdade.lojavirtual.model.Pedido;
import br.com.faculdade.lojavirtual.model.Produto;
import br.com.faculdade.lojavirtual.repository.PedidoRepository;
import br.com.faculdade.lojavirtual.repository.ProdutoRepository;


@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private PagamentoGatewayService pagamentoGateway;

    @Transactional 
    public Pedido processarCheckout(Pedido pedido, FormaPagamento formaPagamento) {
        
        for (ItemPedido item : pedido.getItens()) {
            Produto produtoDb = produtoRepository.findById(item.getProduto().getId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
            
            produtoDb.reduzirEstoque(item.getQuantidade());
            produtoRepository.save(produtoDb);
        }

        PagamentoResponse respostaApi = formaPagamento.processar(pedido.getValorTotal().doubleValue(), pagamentoGateway);
        
        if (respostaApi.isAprovado()) {
            if (formaPagamento instanceof PagamentoPix) {
                pedido.setStatus("AGUARDANDO_PAGAMENTO_PIX");
                pedido.setCodigoPagamentoExtra(respostaApi.getCodigoTransacao());
            } else {
                pedido.setStatus("PAGO_ENVIAR");
                
                pedido.setCodigoPagamentoExtra(respostaApi.getCodigoTransacao());
            }
        } else {
            pedido.setStatus("PAGAMENTO_RECUSADO");
            throw new RuntimeException(respostaApi.getMensagem());
        }

        return pedidoRepository.save(pedido);
    }
}
