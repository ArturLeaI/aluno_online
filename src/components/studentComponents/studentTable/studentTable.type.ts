export interface Student {
    id: string;
    nomeCompleto: string;
    dataNascimento: string;
    cpf?: string;
    sexo?: string;
  }
  
  export interface StudentTableProps {
    students: Student[];
    enrollments: any[];
    grades: any[];
    page: number;
    rowsPerPage: number;
    onViewDetails: (student: Student) => void;
    onEnroll: (student: Student) => void;
    onViewGrades: (student: Student) => void;
    hideActions?: boolean;
    showViewActions?: boolean; 
  }
  