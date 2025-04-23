import { DateTime } from 'luxon';
import { SchoolEvent } from '../../../pages/calendarPage/calendarPage.type';

export interface EventListDialogProps {
  open: boolean;
  selectedDate: DateTime | null;
  onClose: () => void;
  events: SchoolEvent[];
  getEventColor: (type: string) => string;
  isProfessor: boolean;
  onEditEvent?: (event: SchoolEvent) => void;
  onDeleteEvent?: (id: string) => void;
}