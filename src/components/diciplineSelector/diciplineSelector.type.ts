export interface Discipline {
    id: string;
    name: string;
    codigo: string;
  }
  
  export interface DisciplineSelectorProps {
    disciplines: Discipline[];
    value: string;
    onChange: (value: string) => void;
  }