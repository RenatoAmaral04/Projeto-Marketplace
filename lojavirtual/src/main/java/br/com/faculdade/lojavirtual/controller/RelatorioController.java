package br.com.faculdade.lojavirtual.controller;

import br.com.faculdade.lojavirtual.model.Pedido;
import br.com.faculdade.lojavirtual.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/relatorios")
public class RelatorioController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @GetMapping("/vendas")
    public ResponseEntity<Map<String, Object>> obterRelatorioVendas() {
        List<Pedido> todosPedidos = pedidoRepository.findAll();
        
        long totalPedidos = todosPedidos.size();
        BigDecimal faturamentoTotal = todosPedidos.stream()
                .map(Pedido::getValorTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> relatorio = new HashMap<>();
        relatorio.put("total_pedidos_realizados", totalPedidos);
        relatorio.put("faturamento_total", faturamentoTotal);
        relatorio.put("status", "Operacional");

        return ResponseEntity.ok(relatorio);
    }
}