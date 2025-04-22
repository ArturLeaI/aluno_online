import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Discipline } from '../pages/calendarPage/calendarPage.type';

interface DisciplineStore {
  disciplines: Discipline[];
  addDiscipline: (discipline: Omit<Discipline, 'id'>) => void;
  updateDiscipline: (id: string, updatedData: Partial<Discipline>) => void;
  removeDiscipline: (id: string) => void;
}

export const useDisciplineStore = create<DisciplineStore>()(
  persist(
    (set) => ({
      disciplines: [], // Array vazio inicial
      
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
      name: 'discipline-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);