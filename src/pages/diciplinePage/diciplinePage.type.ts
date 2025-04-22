export type UserType = 'aluno' | 'professor';

export interface UserData {
  userType: UserType;
  userCPF: string;
}

export interface AlunoMatriculado {
  cpf: string;
  name: string;
}

export interface Disciplina {
  id: string;
  name: string;
  codigo?: string;
  professor?: string;
  alunosMatriculados?: AlunoMatriculado[];
}