export interface Discipline {
    id: string;
    name: string;
    code: string;
  }
  
  export interface DisciplineSelectorProps {
    disciplines: Discipline[];
    value: string;
    onChange: (value: string) => void;
  }