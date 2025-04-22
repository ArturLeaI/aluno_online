export type UserType = 'aluno' | 'professor';

export interface UserData {
  userType: UserType;
  userCPF: string;
}

export interface AlunoMatriculado {
  cpf: string;
  nome: string;
}

export interface Disciplina {
  id: string;
  nome: string;
  codigo?: string;
  professor?: string;
  alunosMatriculados?: AlunoMatriculado[];
}