export interface Student {
    id: string;
    nomeCompleto: string;
    dataNascimento: string;
    cpf?: string;
  }
  
  export interface Discipline {
    id: string;
    codigo: string;
    name: string;
  }
  
  export interface Enrollment {
    id: string;
    disciplinaId: string;
    status: 'ativo' | 'inativo' | 'concluído';
  }
  
  export interface Grade {
    id: string;
    enrollmentId: string;
    p1: number | null;
    exercises: number | null;
    report: number | null;
  }
  
  export interface StudentGradesModalProps {
    open: boolean;
    student: Student | null;
    enrollments: Enrollment[];
    grades: Grade[];
    disciplines: Discipline[];
    onClose: () => void;
  }
  