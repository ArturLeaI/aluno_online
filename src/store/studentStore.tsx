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
  clearStudents: () => void;
  removeStudent: (index: number) => void;
};

export const useStudentStore = create<StudentStore>()(
  persist(
    (set) => ({
      students: [],
      addStudent: (student) => 
        set((state) => ({ students: [...state.students, student] })),
      clearStudents: () => set({ students: [] }),
      removeStudent: (index) => 
        set((state) => ({ 
          students: state.students.filter((_, i) => i !== index) 
        })),
    }),
    {
      name: 'student-storage', // Nome da chave no localStorage
      storage: createJSONStorage(() => localStorage), // Forma correta de especificar o storage
    }
  )
);