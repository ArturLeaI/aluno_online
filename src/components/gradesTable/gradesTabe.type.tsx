// types/gradeTypes.ts
export interface GradeInput {
    studentId: string;
    p1: number | null;
    exercises: number | null;
    report: number | null;
  }
  
  export interface GradeRowData {
    student: {
      id: string;
      nomeCompleto: string;
    };
    grade: GradeInput;
    onGradeChange: (field: 'p1' | 'exercises' | 'report', value: string) => void;
  }