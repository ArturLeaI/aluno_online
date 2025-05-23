import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { DateTime } from 'luxon';
import { useCalendarStore } from '../../../store/calendarStore/calendarStore';
import { NotificationSnackbarProps, NotificationState } from './notificationSnackbar.type';
import { SchoolEvent } from '../../../pages/calendarPage/calendarPage.type';

export const NotificationSnackbar: React.FC<NotificationSnackbarProps> = ({ events }) => {
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const { markAsNotified } = useCalendarStore();

  const getNotificationMessage = (event: SchoolEvent, daysDiff: number, eventDate: DateTime) => {
    if (daysDiff === 0) return `Hoje: ${event.title} (${event.subject})`;
    if (daysDiff === 1) return `Amanhã: ${event.title} (${event.subject})`;
    return `Em ${Math.ceil(daysDiff)} dias: ${event.title} (${event.subject}) - ${eventDate.toFormat('dd/MM')}`;
  };

  const showEventNotifications = () => {
    const now = DateTime.now();
    const futureEvents = events
      .filter(event => DateTime.fromISO(event.date) >= now)
      .sort((a, b) => DateTime.fromISO(a.date).toMillis() - DateTime.fromISO(b.date).toMillis());

    futureEvents.forEach((event) => {
      const eventDate = DateTime.fromISO(event.date);
      const daysDiff = eventDate.diff(now, 'days').days;
      const message = getNotificationMessage(event, daysDiff, eventDate);

      setNotification({ open: true, message, severity: 'info' });
      if (!event.notified) markAsNotified(event.id);
    });
  };

  useEffect(() => {
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