package br.com.faculdade.lojavirtual.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.faculdade.lojavirtual.model.PagamentoPix;
import br.com.faculdade.lojavirtual.model.Pedido;
import br.com.faculdade.lojavirtual.service.PedidoService;


@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/checkout-pix")
    public ResponseEntity<?> finalizarPedidoPix(@RequestBody Pedido pedido, @RequestParam String cpf) {
        try {
      
            Pedido pedidoSalvo = pedidoService.processarCheckout(pedido, new PagamentoPix(cpf));
            return ResponseEntity.ok(pedidoSalvo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}