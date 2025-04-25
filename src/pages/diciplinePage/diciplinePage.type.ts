export type UserType = 'aluno' | 'professor';

export interface UserData {
  userType: UserType;
  userCPF: string;
}

export interface AlunoMatriculado {
  cpf: string;
  name: string;
}

export interface Discipline {
  id: string;
  name: string;
  codigo: string; 
  cargaHoraria: string;
  professor: string;
  departamento: string;
  periodo: string;
  descricao: string;
  preRequisitos: string[];
}