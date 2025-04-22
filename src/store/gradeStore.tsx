import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Grade {
  id: string;
  enrollmentId: string;
  p1: number | null;
  exercises: number | null;
  report: number | null;
  createdAt: string;
  updatedAt: string;
}

interface GradeStore {
  grades: Grade[];
  getGradesByEnrollment: (enrollmentId: string) => Grade | undefined;
  getGradesByDiscipline: (disciplineId: string) => Grade[];
  saveGrade: (grade: Omit<Grade, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const useGradeStore = create<GradeStore>()(
  persist(
    (set, get) => ({
      grades: [],
      
      getGradesByEnrollment: (enrollmentId) => {
        return get().grades.find(grade => grade.enrollmentId === enrollmentId);
      },
      
      getGradesByDiscipline: (disciplineId) => {
        console.log(`Filtrando notas por disciplina: ${disciplineId}`);
        return get().grades;
      },
      
      saveGrade: (grade) => {
        const newGrade = {
          ...grade,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set((state) => ({ grades: [...state.grades, newGrade] }));
      },
      
    }),
    {
      name: 'grade-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ grades: state.grades }),
    }
  )
);