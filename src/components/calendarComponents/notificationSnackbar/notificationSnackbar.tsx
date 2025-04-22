import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { DateTime } from 'luxon';
import { SchoolEvent } from '../../../pages/calendarPage/calendarPage.type';
import { useCalendarStore } from '../../../store/calendarStore';

interface NotificationSnackbarProps {
  events: SchoolEvent[];
}

export const NotificationSnackbar: React.FC<NotificationSnackbarProps> = ({ events }) => {
  const [notification, setNotification] = useState<{
    open: boolean, 
    message: string, 
    severity: 'success' | 'error' | 'info' | 'warning'
  } | null>(null);
  const { markAsNotified } = useCalendarStore();

  useEffect(() => {
    const showEventNotifications = () => {
      const now = DateTime.now();
      const futureEvents = events
        .filter(event => DateTime.fromISO(event.date) >= now)
        .sort((a, b) => DateTime.fromISO(a.date).toMillis() - DateTime.fromISO(b.date).toMillis());
  
      futureEvents.forEach((event) => {
        const eventDate = DateTime.fromISO(event.date);
        const daysDiff = eventDate.diff(now, 'days').days;
  
        let message = '';
        if (daysDiff === 0) message = `Hoje: ${event.title} (${event.subject})`;
        else if (daysDiff === 1) message = `Amanhã: ${event.title} (${event.subject})`;
        else message = `Em ${Math.ceil(daysDiff)} dias: ${event.title} (${event.subject}) - ${eventDate.toFormat('dd/MM')}`;
  
        setNotification({ open: true, message, severity: 'info' });
        if (!event.notified) markAsNotified(event.id);
      });
    };

    showEventNotifications();
    const interval = setInterval(showEventNotifications, 3600000);
    return () => clearInterval(interval);
  }, [events, markAsNotified]);

  return (
    <Snackbar
      open={!!notification?.open}
      autoHideDuration={6000}
      onClose={() => setNotification(null)}
    >
      <Alert onClose={() => setNotification(null)} severity={notification?.severity || 'info'}>
        {notification?.message}
      </Alert>
    </Snackbar>
  );
};