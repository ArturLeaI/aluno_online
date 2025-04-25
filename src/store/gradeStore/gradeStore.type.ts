export interface Grade {
    id: string;
    enrollmentId: string;
    p1: number | null;
    exercises: number | null;
    report: number | null;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface GradeStore {
    grades: Grade[];
    getGradesByEnrollment: (enrollmentId: string) => Grade | undefined;
    getGradesByDiscipline: (disciplineId: string) => Grade[];
    saveGrade: (grade: Omit<Grade, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateGrade: (
      id: string, 
      updatedData: Partial<Omit<Grade, 'id' | 'enrollmentId' | 'createdAt'>>
    ) => void;
  }