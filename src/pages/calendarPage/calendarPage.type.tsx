import { DateTime } from 'luxon';

export type EventType = 'Relatorio' | 'Prova' | 'Apresentação';

export interface Discipline {
  id: string;
  name: string;
  code: string;
  cargaHoraria: string;
  professor: string;
  departamento: string;
  periodo: string;
  descricao?: string;
  preRequisitos?: string[];
}

export interface SchoolEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: EventType;
  subject: string;
  notified: boolean;
}

export interface DayObject {
  day: number;
  currentMonth: boolean;
  date: DateTime;
}

export interface CalendarState {
  events: SchoolEvent[];
  addEvent: (event: SchoolEvent) => void;
  deleteEvent: (id: string) => void;
  markAsNotified: (id: string) => void;
}

export interface NotificationState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

export type NewEventData = Omit<SchoolEvent, 'id' | 'notified'>;

export interface DayCellProps {
  dayObj: DayObject;
  handleDateClick: (date: DateTime) => void;
  getEventsForDay: (date: DateTime) => SchoolEvent[];
  getEventColor: (type: EventType) => string;
  isProfessor: boolean;
}

export interface EventDialogProps {
  open: boolean;
  onClose: () => void;
  disciplines: Discipline[];
}

export interface EventListDialogProps {
  open: boolean;
  selectedDate: DateTime | null;
  onClose: () => void;
  events: SchoolEvent[];
  getEventColor: (type: EventType) => string;
  isProfessor: boolean;
  onEditEvent?: (event: SchoolEvent) => void;
  onDeleteEvent?: (id: string) => void;
}

export interface Discipline {
    id: string;
    name: string;
    code: string;
    cargaHoraria: string;
    professor: string;
    departamento: string;
    periodo: string;
    descricao?: string;
    preRequisitos?: string[];
  }