// src/store/gradeStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Grade {
  id: string;
  enrollmentId: string; // Referência à matrícula
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
  updateGrade: (id: string, updatedData: Partial<Grade>) => void;
  clearGrades: () => void; // Nova função para limpar dados
}

export const useGradeStore = create<GradeStore>()(
  persist(
    (set, get) => ({
      grades: [],
      
      getGradesByEnrollment: (enrollmentId) => {
        return get().grades.find(grade => grade.enrollmentId === enrollmentId);
      },
      
      getGradesByDiscipline: (disciplineId) => {
        // Implementação temporária que retorna todas as notas
        // Você precisará integrar com o store de matrículas para filtrar por disciplina
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
      
      updateGrade: (id, updatedData) => {
        set((state) => ({
          grades: state.grades.map(grade =>
            grade.id === id
              ? { ...grade, ...updatedData, updatedAt: new Date().toISOString() }
              : grade
          )
        }));
      },
      
      clearGrades: () => {
        set({ grades: [] });
      }
    }),
    {
      name: 'grade-storage', // Nome único para o localStorage
      storage: createJSONStorage(() => localStorage), // Usando localStorage
      partialize: (state) => ({ grades: state.grades }), // Define quais partes do estado serão persistidas
    }
  )
);