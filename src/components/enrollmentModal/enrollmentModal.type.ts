export interface Student {
    id: string;
    nomeCompleto: string;
    cpf: string;
  }
  
  export interface Discipline {
    id: string;
    name: string;
    codigo: string;
    professor: string;
  }
  
  export interface Enrollment {
    id: string;
    disciplinaId: string;
    status: 'ativo' | 'inativo' | 'concluído';
  }
  
  export interface EnrollmentModalProps {
    open: boolean;
    student: Student | null;
    disciplines: Discipline[];
    enrollments: Enrollment[];
    onClose: () => void;
    onEnroll: (data: { disciplinesIds: string[]; studentCpf: string }) => void;
    readOnly?: boolean;
  }