export interface Discipline {
    id: string;
    name: string;
  }
  
  export interface StudentFiltersProps {
    disciplines: Discipline[];
    onFilterChange: (disciplineId: string) => void;
    onResetFilters: () => void;
  }
  