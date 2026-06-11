package br.com.faculdade.lojavirtual.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Pedido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private LocalDateTime dataCriacao;
    private String status;
    private BigDecimal valorTotal;
    private String codigoPagamentoExtra;

    @ManyToOne
    private Cliente cliente;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "pedido_id")
    private List<ItemPedido> itens = new ArrayList<>();

    public Pedido() {
        this.dataCriacao = LocalDateTime.now();
        this.status = "AGUARDANDO_PROCESSAMENTO";
        this.valorTotal = BigDecimal.ZERO;
    }

    public void adicionarItem(ItemPedido item) {
        this.itens.add(item);
        calcularTotal();
    }

    private void calcularTotal() {
        this.valorTotal = itens.stream()
                               .map(ItemPedido::getSubtotal)
                               .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public String getCodigoPagamentoExtra() {
        return codigoPagamentoExtra;
    }

    public void setCodigoPagamentoExtra(String codigoPagamentoExtra) {
        this.codigoPagamentoExtra = codigoPagamentoExtra;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<ItemPedido> getItens() {
        return itens;
    }

    public void setItens(List<ItemPedido> itens) {
        this.itens = itens;
    }
}