import { DateTime } from 'luxon';
import { Discipline, SchoolEvent } from '../../../pages/calendarPage/calendarPage.type';

export interface EventListDialogProps {
  open: boolean;
  selectedDate: DateTime | null;
  onClose: () => void;
  events: SchoolEvent[];
  getEventColor: (type: string) => string;
  isProfessor: boolean;
  onEditEvent?: (event: SchoolEvent) => void;
  onDeleteEvent?: (id: string) => void;
    disciplines: Discipline[];
    initialDate?: string| null;
}

export const addButtonStyles = {
  marginRight: 'auto',
  backgroundColor: '#4caf50',
  '&:hover': {
      backgroundColor: '#388e3c',
  }
};