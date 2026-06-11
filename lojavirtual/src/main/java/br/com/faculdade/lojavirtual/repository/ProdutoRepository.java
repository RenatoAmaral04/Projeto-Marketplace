package br.com.faculdade.lojavirtual.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.faculdade.lojavirtual.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}