export type EventType = 'Relatorio' | 'Prova' | 'Apresentação';


export interface CalendarEvent {
    id: string;
    title: string;
    date: string;
    type: EventType;
    notified: boolean;
    subject: string;
    description: string;
  }

export interface CalendarState {
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  markAsNotified: (id: string) => void;
}