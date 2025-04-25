export interface Discipline {
    id: string;
    name: string;
    code: string;
    cargaHoraria: string;
    professor: string;
    departamento: string;
    periodo: string;
    descricao?: string;
    preRequisitos?: string[];
  }
  
  export interface DisciplineStore {
    disciplines: Discipline[];
    addDiscipline: (discipline: Omit<Discipline, 'id'>) => void;
  }