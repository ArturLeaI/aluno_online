import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Discipline {
  id: string;
  nome: string;
  codigo: string;
  cargaHoraria: string;
  professor: string;
  departamento: string;
  periodo: string;
  descricao?: string;
  preRequisitos?: string[];
}

interface DisciplineStore {
  disciplines: Discipline[];
  addDiscipline: (discipline: Omit<Discipline, 'id'>) => void;
  updateDiscipline: (id: string, updatedData: Partial<Discipline>) => void;
  removeDiscipline: (id: string) => void;
}

export const useDisciplineStore = create<DisciplineStore>()(
  persist(
    (set) => ({
      disciplines: [
        {
          id: '1',
          nome: 'Matemática Avançada',
          codigo: 'MAT101',
          cargaHoraria: '60 horas',
          professor: 'Dr. Carlos Silva',
          departamento: 'Matemática',
          periodo: '2023.1',
          descricao: 'Cálculo diferencial e integral'
        },
        // Mais disciplinas podem ser adicionadas aqui
      ],
      
      addDiscipline: (discipline) => 
        set((state) => ({
          disciplines: [
            ...state.disciplines,
            { ...discipline, id: Date.now().toString() }
          ]
        })),
        
      updateDiscipline: (id, updatedData) =>
        set((state) => ({
          disciplines: state.disciplines.map((discipline) =>
            discipline.id === id ? { ...discipline, ...updatedData } : discipline
          )
        })),
        
      removeDiscipline: (id) =>
        set((state) => ({
          disciplines: state.disciplines.filter((discipline) => discipline.id !== id)
        }))
    }),
    {
      name: 'discipline-storage', // nome do item no local storage
      storage: createJSONStorage(() => localStorage), // use o local storage
    }
  )
);