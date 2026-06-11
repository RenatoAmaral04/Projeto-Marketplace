import { createContext, useState, ReactNode } from 'react';
import { Usuario } from '../types/Usuario';

interface AuthContextData {
  usuario: Usuario | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const login = async (email: string, senha: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      if (response.ok) {
        const data = await response.json();
        setUsuario(data); // Salva o admin ou o cliente
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro no login", error);
      return false;
    }
  };

  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};