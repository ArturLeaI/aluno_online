// types.ts
export type UserType = 'aluno' | 'professor';

export interface UserData {
  userType: UserType;
  userCPF: string;
}

export interface AlunoMatriculado {
  cpf: string;
  nome: string;
  // outros campos do aluno se necessário
}

export interface Disciplina {
  id: string;
  nome: string;
  codigo?: string;
  professor?: string;
  alunosMatriculados?: AlunoMatriculado[];
  // outros campos da disciplina
}