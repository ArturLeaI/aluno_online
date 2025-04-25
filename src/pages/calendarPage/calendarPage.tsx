import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import { DateTime } from 'luxon';
import { useUserType } from '../../hooks/useUserType';
import { useDisciplineStore, useCalendarStore } from '../../store';
import { CalendarHeader, MonthNavigator, WeekDaysHeader, CalendarGrid, EventListDialog, EventDialog, NotificationSnackbar } from '../../components';

const SchoolCalendar: React.FC = () => {
  const userType = useUserType();
  const isProfessor = userType === 'professor';
  const { disciplines } = useDisciplineStore();
  const { events, deleteEvent } = useCalendarStore();

  const [currentMonth, setCurrentMonth] = useState(DateTime.now());
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

  const handlePrevMonth = () => setCurrentMonth(currentMonth.minus({ months: 1 }));
  const handleNextMonth = () => setCurrentMonth(currentMonth.plus({ months: 1 }));

  const handleDateClick = (date: DateTime) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    setIsEventDialogOpen(true);
  };

  const getEventColor = useCallback((type: string) => {
    return {
      deadline: '#f44336',
      test: '#ff9800',
      presentation: '#4caf50'
    }[type] || '#2196f3';
  }, []);

  const handleDeleteEvent = useCallback((id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      deleteEvent(id);
    }
  }, [deleteEvent]);
  

  return (
    <Box sx={{ p: 2 }}>
      <CalendarHeader
        isProfessor={isProfessor}
        onAddEvent={isProfessor ? handleAddEvent : undefined}
      />

      <MonthNavigator
        currentMonth={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      <WeekDaysHeader />

      <CalendarGrid
        currentMonth={currentMonth}
        isProfessor={isProfessor}
        onDateClick={handleDateClick}
        events={events}
      />

      <EventListDialog
        open={!!selectedDate}
        selectedDate={selectedDate}
        onClose={() => setSelectedDate(null)}
        events={events}
        getEventColor={getEventColor}
        isProfessor={isProfessor}
        onDeleteEvent={isProfessor ? handleDeleteEvent : undefined}
        disciplines={disciplines}
      />

      {isProfessor && (
        <EventDialog
          open={isEventDialogOpen}
          onClose={() => setIsEventDialogOpen(false)}
          disciplines={disciplines}
        />
      )}

      <NotificationSnackbar events={events} />
    </Box>
  );
};

export default SchoolCalendar;