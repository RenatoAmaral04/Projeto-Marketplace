package br.com.faculdade.lojavirtual.model;

import jakarta.persistence.Entity;

@Entity
public class Administrador extends Usuario {
    
    private String setorResponsavel;

    public Administrador() {}

    public Administrador(String nome, String email, String senha, String setorResponsavel) {
        super(nome, email, senha);
        this.setorResponsavel = setorResponsavel;
    }

    @Override
    public String getPerfil() {
        return "PERFIL_ADMIN";
    }

    public String getSetorResponsavel() {
        return setorResponsavel;
    }

    public void setSetorResponsavel(String setorResponsavel) {
        this.setorResponsavel = setorResponsavel;
    }
}
