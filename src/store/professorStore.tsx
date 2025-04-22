import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Professor = {
  id: string;
  nomeCompleto: string;
  cpf: string;
  email: string;
  titulacao: string;
  dataNascimento: string;
  sexo: string;
  areaAtuacao: string;
  dataContratacao: string;
  telefone?: string;
  celular?: string;
  endereco?: string;
  cep?: string;
};

type ProfessorStore = {
  professores: Professor[];
  adicionarProfessor: (professor: Professor) => void;
};

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