import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {CalendarState} from '../pages/calendarPage/calendarPage.type'
type EventType = 'deadline' | 'test' | 'presentation';

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      events: [],
      addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
      updateEvent: (id, updates) => set((state) => ({
        events: state.events.map((event) => 
          event.id === id ? { ...event, ...updates } : event
        )
      })),
      deleteEvent: (id) => set((state) => ({
        events: state.events.filter((event) => event.id !== id)
      })),
      markAsNotified: (id) => set((state) => ({
        events: state.events.map((event) => 
          event.id === id ? { ...event, notified: true } : event
        )
      })),
    }),
    {
      name: 'school-calendar-storage',
      storage: {
        getItem: (name) => Promise.resolve(
          localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)!) : null
        ),
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
          return Promise.resolve();
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
          return Promise.resolve();
        },
      },
    }
  )
);

export type { EventType };