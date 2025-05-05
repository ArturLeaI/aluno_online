import { Discipline } from '../../../pages/calendarPage/calendarPage.type';

export interface EventForm {
    title: string;
    date: string;
    type: EventType; 
    subject: string;
    description: string;
}

export interface EventDialogProps {
    open: boolean;
    onClose: () => void;
    disciplines: Discipline[];
}

export interface EventDialogProps {
    open: boolean;
    onClose: () => void;
    disciplines: Discipline[];
    initialDate?: string | null;
    
}
export type EventType = 'Relatorio' | 'Prova' | 'Apresentação';

export interface EventForm {
    title: string;
    date: string;
    type: EventType;
    subject: string;
    description: string;
  }

  export interface EventTypeOption {
    value: EventType;
    label: string;
  }