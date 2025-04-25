export interface Discipline {
    nome: string;
    code: string;
    cargaHoraria: string;
    periodo?: string; 
    professor?: string;
    departamento?: string;
    preRequisitos?: string[];
    descricao?: string;
  }
  
  export interface DisciplineDetailsModalProps {
    open: boolean;
    onClose: () => void;
    discipline: Discipline | null;
    
  }