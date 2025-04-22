import { DateTime } from 'luxon';

// Tipos básicos
export type EventType = 'deadline' | 'test' | 'presentation';

export interface Discipline {
  id: string;
  nome: string;
}

export interface SchoolEvent {
  id: string;
  date: string; // Formato YYYY-MM-DD
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

// Tipos para o estado do calendário
export interface CalendarState {
  events: SchoolEvent[];
  addEvent: (event: SchoolEvent) => void;
  updateEvent: (id: string, event: Partial<SchoolEvent>) => void;
  deleteEvent: (id: string) => void;
  markAsNotified: (id: string) => void;
}

// Tipos para notificações
export interface NotificationState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

// Tipos utilitários
export type NewEventData = Omit<SchoolEvent, 'id' | 'notified'>;

// Props para componentes
export interface DayCellProps {
  dayObj: DayObject;
  handleDateClick: (date: DateTime) => void;
  getEventsForDay: (date: DateTime) => SchoolEvent[];
  getEventColor: (type: EventType) => string;
  isProfessor: boolean;
}

// Props para o EventDialog
export interface EventDialogProps {
  open: boolean;
  onClose: () => void;
  disciplines: Discipline[];
}

// Props para o EventListDialog
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
    nome: string;
    codigo: string;
    cargaHoraria: string;
    professor: string;
    departamento: string;
    periodo: string;
    descricao?: string;
    preRequisitos?: string[];
  }