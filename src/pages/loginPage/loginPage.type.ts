export type UserType = 'aluno' | 'professor';

export interface LoginFormData {
  cpf: string;
  userType: UserType;
}

export interface LoginFormErrors {
  cpf: boolean;
}