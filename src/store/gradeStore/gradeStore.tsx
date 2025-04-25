import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { GradeStore } from './gradeStore.type';

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
      
      updateGrade: (id, updatedData) => {
        set((state) => ({
          grades: state.grades.map((grade) => 
            grade.id === id 
              ? { 
                  ...grade, 
                  ...updatedData, 
                  updatedAt: new Date().toISOString() 
                } 
              : grade
          )
        }));
      }
    }),
    {
      name: 'grade-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ grades: state.grades }),
    }
  )
);