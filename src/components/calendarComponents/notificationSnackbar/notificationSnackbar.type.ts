import { SchoolEvent } from '../../../pages/calendarPage/calendarPage.type';

export interface NotificationState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

export interface NotificationSnackbarProps {
  events: SchoolEvent[];
}