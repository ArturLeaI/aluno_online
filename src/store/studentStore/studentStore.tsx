import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StudentStore } from './studentStore.type';

export const useStudentStore = create<StudentStore>()(
  persist(
    (set) => ({
      students: [],
      addStudent: (student) => 
        set((state) => ({ 
          students: [...state.students, student] 
        })),
    }),
    {
      name: 'student-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);