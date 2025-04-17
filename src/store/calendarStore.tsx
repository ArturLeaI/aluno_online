import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Event {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  type: 'activity' | 'test' | 'presentation';
  description: string;
  notificationDaysBefore: number;
  notified: boolean;
}

interface CalendarState {
  events: Event[];
  addEvent: (event: Omit<Event, 'id' | 'notified'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEventsByDate: (date: string) => Event[];
  checkNotifications: () => Event[];
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set, get) => ({
      events: [],
      addEvent: (event) => {
        const newEvent = {
          ...event,
          id: Date.now().toString(),
          notified: false,
        };
        set((state) => ({ events: [...state.events, newEvent] }));
      },
      updateEvent: (id, updates) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, ...updates } : event
          ),
        }));
      },
      deleteEvent: (id) => {
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        }));
      },
      getEventsByDate: (date) => {
        return get().events.filter((event) => event.date === date);
      },
      checkNotifications: () => {
        const today = new Date();
        const eventsToNotify = get().events.filter((event) => {
          if (event.notified) return false;
          
          const eventDate = new Date(event.date);
          const diffInDays = Math.floor(
            (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          );
          
          return diffInDays <= event.notificationDaysBefore;
        });

        // Marcar eventos como notificados
        if (eventsToNotify.length > 0) {
          set((state) => ({
            events: state.events.map((event) =>
              eventsToNotify.some((e) => e.id === event.id)
                ? { ...event, notified: true }
                : event
            ),
          }));
        }

        return eventsToNotify;
      },
    }),
    {
      name: 'calendar-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);