package br.com.faculdade.lojavirtual.service; 

import br.com.faculdade.lojavirtual.model.Administrador;
import br.com.faculdade.lojavirtual.model.Produto;
import br.com.faculdade.lojavirtual.repository.ProdutoRepository;
import br.com.faculdade.lojavirtual.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.math.BigDecimal;
import java.util.Arrays;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner initDatabase(ProdutoRepository produtoRepository, UsuarioRepository usuarioRepository) {
        return args -> {
         
            if (usuarioRepository.count() == 0) {
                Administrador admin = new Administrador("Administrador Nexora", "admin@nexora.com", "1234", "Diretoria de Vendas");
                usuarioRepository.save(admin);
            }

            if (produtoRepository.count() == 0) {
                Produto p1 = new Produto(); p1.setNome("Nexora Buds Pro"); p1.setDescricao("Fones de ouvido com cancelamento de ruído ativo"); p1.setPreco(new BigDecimal("129.00")); p1.setEstoque(100);
                Produto p2 = new Produto(); p2.setNome("Nexora Watch X"); p2.setDescricao("Smartwatch premium com tela AMOLED"); p2.setPreco(new BigDecimal("199.00")); p2.setEstoque(50);
                Produto p3 = new Produto(); p3.setNome("Nexora Laptop Air"); p3.setDescricao("Notebook ultra fino para desenvolvedores"); p3.setPreco(new BigDecimal("999.00")); p3.setEstoque(30);
                Produto p4 = new Produto(); p4.setNome("Nexora Phone 15"); p4.setDescricao("Smartphone com câmera de 108MP e 256GB"); p4.setPreco(new BigDecimal("799.00")); p4.setEstoque(70);
                Produto p5 = new Produto(); p5.setNome("Nexora SoundBox"); p5.setDescricao("Caixa de som Bluetooth com som espacial"); p5.setPreco(new BigDecimal("89.00")); p5.setEstoque(120);
                Produto p6 = new Produto(); p6.setNome("Nexora Cam 4K"); p6.setDescricao("Câmera de ação à prova d'água"); p6.setPreco(new BigDecimal("249.00")); p6.setEstoque(40);
                Produto p7 = new Produto(); p7.setNome("Nexora Smart TV"); p7.setDescricao("Display gamer 4K de 32 polegadas"); p7.setPreco(new BigDecimal("449.00")); p7.setEstoque(20);

                produtoRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6, p7));
            }
        };
    }
}