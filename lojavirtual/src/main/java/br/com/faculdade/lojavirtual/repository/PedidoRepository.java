package br.com.faculdade.lojavirtual.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.faculdade.lojavirtual.model.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}