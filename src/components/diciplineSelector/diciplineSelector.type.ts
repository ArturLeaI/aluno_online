export interface Discipline {
    id: string;
    nome: string;
    codigo: string;
  }
  
  export interface DisciplineSelectorProps {
    disciplines: Discipline[];
    value: string;
    onChange: (value: string) => void;
  }