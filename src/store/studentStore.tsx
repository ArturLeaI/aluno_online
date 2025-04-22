import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Student = {
  id: string;
  nomeCompleto: string;
  nomePai: string;
  nomeMae: string;
  dataNascimento: string;
  sexo: string;
  estadoNascimento: string;
  municipioNascimento: string;
  racaCor: string;
  tipoEscola: string;
  estadoCivil: string;
  nacionalidade: string;
  cpf: string;
};

type StudentStore = {
  students: Student[];
  addStudent: (student: Student) => void;
};

export const useStudentStore = create<StudentStore>()(
  persist(
    (set) => ({
      students: [],
      addStudent: (student) => 
        set((state) => ({ students: [...state.students, student] })),
    }),
    {
      name: 'student-storage',
      storage: createJSONStorage(() => localStorage), 
    }
  )
);