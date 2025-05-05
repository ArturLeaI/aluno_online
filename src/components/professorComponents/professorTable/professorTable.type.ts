export interface Professor {
  id: string;
  nomeCompleto: string;
  cpf: string;
  email: string;
  titulacao: string;
}

export interface TableHeader {
  id: string;
  label: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
}

export interface ProfessoresTableProps {
  professores: Professor[];
  pagina: number;
  linhasPorPagina: number;
  onAbrirModal: (professor: Professor) => void;
}