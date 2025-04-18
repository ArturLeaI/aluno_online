import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // Importe createJSONStorage

interface Enrollment {
  id: string;
  alunoId: string;
  disciplinaId: string;
  dataMatricula: string;
  periodo: string;
  status: 'ativo' | 'inativo' | 'concluído';
  gradeId?: string; 
}

interface EnrollmentStore {
  enrollments: Enrollment[];
  addEnrollment: (enrollment: Omit<Enrollment, 'id'>) => void;
  updateEnrollment: (id: string, updatedData: Partial<Enrollment>) => void;
  cancelEnrollment: (id: string) => void;
  getEnrollmentsByStudent: (alunoId: string) => Enrollment[];
  getEnrollmentsByDiscipline: (disciplinaId: string) => Enrollment[];
}

export const useEnrollmentStore = create<EnrollmentStore>()(
  persist(
    (set, get) => ({
      enrollments: [
        {
          id: '1',
          alunoId: '1',
          disciplinaId: '1',
          dataMatricula: '2023-03-01',
          periodo: '2023.1',
          status: 'ativo'
        },
        {
          id: '2',
          alunoId: '1',
          disciplinaId: '2',
          dataMatricula: '2023-03-01',
          periodo: '2023.1',
          status: 'ativo'
        }
      ],
      
      addEnrollment: (enrollment) => {
        const existingEnrollment = get().enrollments.find(e => e.alunoId === enrollment.alunoId && e.disciplinaId === enrollment.disciplinaId);
        if (existingEnrollment) {
          console.log('Matrícula já existe');
          return;
        }
        const newEnrollment = {
          ...enrollment,
          id: crypto.randomUUID(), // ID único
        };
        set(state => ({
          enrollments: [...state.enrollments, newEnrollment],
        }));
      },
        
      updateEnrollment: (id, updatedData) =>
        set((state) => ({
          enrollments: state.enrollments.map((enrollment) =>
            enrollment.id === id ? { ...enrollment, ...updatedData } : enrollment
          )
        })),
        
      cancelEnrollment: (id) =>
        set((state) => ({
          enrollments: state.enrollments.filter((enrollment) => enrollment.id !== id)
        })),
        
      getEnrollmentsByStudent: (alunoId) => {
        return get().enrollments.filter(enrollment => enrollment.alunoId === alunoId);
      },
      
      getEnrollmentsByDiscipline: (disciplinaId) => {
        return get().enrollments.filter(enrollment => enrollment.disciplinaId === disciplinaId);
      }
    }),
    {
      name: 'enrollment-storage', // nome do item no local storage
      storage: createJSONStorage(() => localStorage), // use o local storage
    }
  )
);