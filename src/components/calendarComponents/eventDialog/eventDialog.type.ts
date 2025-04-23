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

export type EventType = 'deadline' | 'test' | 'presentation';