// types/calendarTypes.ts
export interface CalendarEvent {
    id: string;
    title: string;
    date: string; // Formato YYYY-MM-DD
    type: 'deadline' | 'exam' | 'presentation' | 'event';
    description?: string;
    subject?: string;
    notify: boolean;
    notificationDaysBefore?: number;
  }
  
  export interface CalendarState {
    events: CalendarEvent[];
    notifications: CalendarEvent[];
  }