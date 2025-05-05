import { Professor } from '../../../types/professorTypes';

export interface ProfessorDetailsModalProps {
  open: boolean;
  onClose: () => void;
  professor: Professor | null;
}

// Se você ainda não tiver o tipo Professor definido, aqui está uma sugestão:
export interface Professor {
  id: string;
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  sexo: string;
  email: string;
  titulacao: string;
  areaAtuacao: string;
  dataContratacao: string;
  telefone?: string;
  celular?: string;
  endereco?: string;
  cep?: string;
}