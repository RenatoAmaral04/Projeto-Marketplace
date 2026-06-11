package br.com.faculdade.lojavirtual.model;

import jakarta.persistence.Entity;

@Entity
public class Cliente extends Usuario {
    
    private String enderecoEntrega;
    private String cpf;

    public Cliente() {}

    public Cliente(String nome, String email, String senha, String enderecoEntrega, String cpf) {
        super(nome, email, senha);
        this.enderecoEntrega = enderecoEntrega;
        this.cpf = cpf;
    }

    @Override
    public String getPerfil() {
        return "PERFIL_CLIENTE";
    }

    public String getEnderecoEntrega() {
        return enderecoEntrega;
    }

    public void setEnderecoEntrega(String enderecoEntrega) {
        this.enderecoEntrega = enderecoEntrega;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
}