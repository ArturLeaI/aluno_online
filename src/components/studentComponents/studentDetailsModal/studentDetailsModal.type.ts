export interface Student {
    id: string;
    nomeCompleto: string;
    dataNascimento: string;
    cpf?: string;
    sexo?: string;
    estadoCivil?: string;
    contato?: string;
    nacionalidade?: string;
  }
  
  export interface Discipline {
    id: string;
    codigo: string;
    name: string;
  }
  
  export interface Enrollment {
    id: string;
    disciplinaId: string;
    periodo: string;
    status: 'ativo' | 'inativo' | 'concluído';
  }
  
  export interface StudentDetailsModalProps {
    open: boolean;
    student: Student | null;
    enrollments: Enrollment[];
    disciplines: Discipline[];
    onClose: () => void;
    onEnroll: () => void;
    isProfessor?: boolean; 
  }
  