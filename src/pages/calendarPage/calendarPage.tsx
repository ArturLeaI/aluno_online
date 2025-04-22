import React, { useState, useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import { DateTime } from 'luxon';
import { useUserType } from '../../hooks/useUserType';
import { useDisciplineStore, useCalendarStore } from '../../store';
import { CalendarHeader, MonthNavigator, WeekDaysHeader, CalendarGrid, EventListDialog, EventDialog, NotificationSnackbar } from '../../components';
import { SchoolEvent } from './calendarPage.type';

const SchoolCalendar: React.FC = () => {
  const userType = useUserType();
  const isProfessor = userType === 'professor';
  const { disciplines } = useDisciplineStore();
  const { events } = useCalendarStore();

  const [currentMonth, setCurrentMonth] = useState(DateTime.now());
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

  // Debug: verifica disciplinas carregadas
  useEffect(() => {
    console.log('Disciplinas no store:', disciplines);
    console.log('Disciplinas no localStorage:', localStorage.getItem('discipline-storage'));
  }, [disciplines]);

  const handlePrevMonth = () => setCurrentMonth(currentMonth.minus({ months: 1 }));
  const handleNextMonth = () => setCurrentMonth(currentMonth.plus({ months: 1 }));

  const handleDateClick = (date: DateTime) => {
    console.log('Clique detectado - Tipo de usuário:', userType);
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    console.log('Disciplinas disponíveis ao abrir dialog:', disciplines);
    setIsEventDialogOpen(true);
  };

  const getEventColor = useCallback((type: string) => {
    return {
      deadline: '#f44336',
      test: '#ff9800',
      presentation: '#4caf50'
    }[type] || '#2196f3';
  }, []);

  const handleEditEvent = useCallback((event: SchoolEvent) => {
    console.log('Editar evento:', event);
  }, []);

  const handleDeleteEvent = useCallback((id: string) => {
    console.log('Excluir evento com id:', id);
  }, []);

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
        events={events.filter(event =>
          selectedDate ?
            DateTime.fromISO(event.date).hasSame(selectedDate, 'day') :
            false
        )}
        getEventColor={getEventColor}
        isProfessor={isProfessor}
        onEditEvent={isProfessor ? handleEditEvent : undefined}
        onDeleteEvent={isProfessor ? handleDeleteEvent : undefined}
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