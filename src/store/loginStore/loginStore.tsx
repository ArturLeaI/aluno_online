import { AuthData, UserType, IAuthStorage } from './loginStore.type';

const AUTH_KEY = 'school_auth_data';

export const AuthStorage: IAuthStorage = {
  login: (cpf: string, userType: UserType) => {
    const authData: AuthData = {
      userType,
      cpf,
      isAuthenticated: true
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  getAuthData: (): AuthData | null => {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  isAuthenticated: (): boolean => {
    const data = AuthStorage.getAuthData();
    return data?.isAuthenticated === true;
  },

  getUserType: (): UserType | null => {
    const data = AuthStorage.getAuthData();
    return data?.userType || null;
  },

  getCPF: (): string | null => {
    const data = AuthStorage.getAuthData();
    return data?.cpf || null;
  }
};