export type UserType = 'aluno' | 'professor';

export interface AuthData {
  userType: UserType;
  cpf: string;
  isAuthenticated: boolean;
}

export interface IAuthStorage {
  login: (cpf: string, userType: UserType) => void;
  logout: () => void;
  getAuthData: () => AuthData | null;
  isAuthenticated: () => boolean;
  getUserType: () => UserType | null;
  getCPF: () => string | null;
}