export interface Student {
  id: string;
  nomeCompleto: string;
  dataNascimento: string;
  cpf?: string;
  sexo?: string;
}

export interface Enrollment {
  id: string;
  alunoId: string;
  disciplinaId: string;
  status: 'ativo' | 'inativo';
}

export interface Grade {
  id: string;
  enrollmentId: string;
  p1: number | null;
  exercises: number | null;
  report: number | null;
}

export interface StudentTableProps {
  students: Student[];
  enrollments: Enrollment[];
  grades: Grade[];
  page: number;
  rowsPerPage: number;
  onViewDetails: (student: Student) => void;
  onEnroll: (student: Student) => void;
  onViewGrades: (student: Student) => void;
  hideActions?: boolean;
  showViewActions?: boolean;
}
