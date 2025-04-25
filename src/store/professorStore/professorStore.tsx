import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProfessorStore } from './professorStore.type';

export const useProfessorStore = create<ProfessorStore>()(
  persist(
    (set) => ({
      professores: [],
      
      adicionarProfessor: (professor) => 
        set((state) => ({ 
          professores: [...state.professores, professor] 
        })),      
    }),
    {
      name: 'professor-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);