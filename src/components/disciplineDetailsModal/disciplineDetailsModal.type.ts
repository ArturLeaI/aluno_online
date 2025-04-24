export interface Discipline {
    nome: string;
    codigo: string;
    cargaHoraria?: string | number;
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