package br.com.faculdade.lojavirtual.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.faculdade.lojavirtual.model.Cliente;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciais) {
        String email = credenciais.get("email");
        String senha = credenciais.get("senha");

        if ("admin@nexora.com".equals(email) && "1234".equals(senha)) {
            Cliente mockUsuario = new Cliente("Administrador Nexora", email, senha, "Sede SP", "111.111.111-11");
            mockUsuario.setId(1L);
            return ResponseEntity.ok(mockUsuario);
        }
        
        return ResponseEntity.status(401).body("Credenciais inválidas");
    }
    
    @GetMapping("/ping")
    public String ping() {
        return "O BACKEND ESTA VIVO E RESPONDENDO!";
    }
}