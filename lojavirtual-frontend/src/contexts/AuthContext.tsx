import { createContext, useState, ReactNode } from 'react';
import { Usuario } from '../types/Usuario';

interface AuthContextData {
  usuario: Usuario | null;
  loginMockado: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // Função que chama o nosso AuthController no Java
  const loginMockado = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@nexora.com', senha: '1234' })
      });
      if (response.ok) {
        const data = await response.json();
        setUsuario({ nome: data.nome, email: data.email, perfil: 'PERFIL_ADMIN' });
        alert(`Bem-vindo, ${data.nome}!`);
      } else {
        alert("Erro no login");
      }
    } catch (error) {
      alert("Erro ao conectar com o Java para o Login.");
    }
  };

  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, loginMockado, logout }}>
      {children}
    </AuthContext.Provider>
  );
};