import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DisciplineStore } from './diciplineStore.type';

export const useDisciplineStore = create<DisciplineStore>()(
  persist(
    (set) => ({
      disciplines: [],
      
      addDiscipline: (discipline) => 
        set((state) => ({
          disciplines: [
            ...state.disciplines,
            { ...discipline, id: Date.now().toString() }
          ]
        })),
    }),
    {
      name: 'discipline-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);