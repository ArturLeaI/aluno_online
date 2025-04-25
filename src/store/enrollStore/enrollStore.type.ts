export type EnrollmentStatus = 'ativo' | 'inativo' | 'concluído';

export interface Enrollment {
  id: string;
  alunoId: string;
  disciplinaId: string;
  dataMatricula: string;
  periodo: string;
  status: EnrollmentStatus;
  gradeId?: string;
}

export interface EnrollmentStore {
  enrollments: Enrollment[];
  addEnrollment: (enrollment: Omit<Enrollment, 'id'>) => void;
  getEnrollmentsByStudent: (alunoId: string) => Enrollment[];
  getEnrollmentsByDiscipline: (disciplinaId: string) => Enrollment[];
}