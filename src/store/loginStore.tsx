// src/auth/authStorage.ts
type UserType = 'aluno' | 'professor';

interface AuthData {
  userType: UserType;
  cpf: string;
  isAuthenticated: boolean;
}

const AUTH_KEY = 'school_auth_data';

export const AuthStorage = {
  // Salva os dados de autenticação
  login: (cpf: string, userType: UserType) => {
    const authData: AuthData = {
      userType,
      cpf,
      isAuthenticated: true
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
  },

  // Remove os dados de autenticação
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  // Obtém os dados de autenticação
  getAuthData: (): AuthData | null => {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Verifica se o usuário está autenticado
  isAuthenticated: (): boolean => {
    const data = AuthStorage.getAuthData();
    return data?.isAuthenticated === true;
  },

  // Obtém o tipo de usuário
  getUserType: (): UserType | null => {
    const data = AuthStorage.getAuthData();
    return data?.userType || null;
  },

  // Obtém o CPF do usuário
  getCPF: (): string | null => {
    const data = AuthStorage.getAuthData();
    return data?.cpf || null;
  }
};