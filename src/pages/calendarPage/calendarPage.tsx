import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DateTime } from 'luxon';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Badge,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme
} from '@mui/material';
import {
  Add,
  Notifications,
  Event as EventIcon,
  Edit,
  Delete,
  Close
} from '@mui/icons-material';
import { useUserType } from '../../hooks/useUserType';
import { useDisciplineStore } from '../../store/diciplineStore';

// Tipos
type EventType = 'deadline' | 'test' | 'presentation';

interface SchoolEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: EventType;
  subject: string;
  notified: boolean;
}

interface DayObject {
  day: number;
  currentMonth: boolean;
  date: DateTime;
}

interface CalendarState {
  events: SchoolEvent[];
  addEvent: (event: SchoolEvent) => void;
  updateEvent: (id: string, event: Partial<SchoolEvent>) => void;
  deleteEvent: (id: string) => void;
  markAsNotified: (id: string) => void;
}

// Store Zustand
const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      events: [],
      addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
      updateEvent: (id, updates) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, ...updates } : event
          ),
        })),
      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        })),
      markAsNotified: (id) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, notified: true } : event
          ),
        })),
    }),
    {
      name: 'school-calendar-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return Promise.resolve(str ? JSON.parse(str) : null);
        },
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

// Componente DayCell
const DayCell = React.memo(({ 
  dayObj, 
  handleDateClick, 
  getEventsForDay, 
  getEventColor 
}: {
  dayObj: DayObject;
  handleDateClick: (date: DateTime) => void;
  getEventsForDay: (date: DateTime) => SchoolEvent[];
  getEventColor: (type: EventType) => string;
}) => {
  const theme = useTheme();
  const dayEvents = useMemo(() => getEventsForDay(dayObj.date), [dayObj.date, getEventsForDay]);
  const isToday = dayObj.date.hasSame(DateTime.now(), 'day');

  return (
    <Paper
      elevation={isToday ? 3 : 0}
      sx={{
        p: 1,
        height: '100%',
        flexGrow: 1,
        backgroundColor: dayObj.currentMonth
          ? isToday
            ? theme.palette.action.selected
            : theme.palette.background.paper
          : theme.palette.action.disabledBackground,
        border: isToday ? `2px solid ${theme.palette.primary.main}` : 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={() => handleDateClick(dayObj.date)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: isToday ? 'bold' : 'normal',
            color: dayObj.currentMonth ? 'text.primary' : 'text.secondary',
          }}
        >
          {dayObj.day}
        </Typography>
        {dayEvents.length > 0 && (
          <Notifications
            fontSize="small"
            sx={{ color: getEventColor(dayEvents[0].type), marginLeft: 1 }}
          />
        )}
      </Box>

      <Box sx={{ marginTop: 1, flexGrow: 1 }}>
        {dayEvents.slice(0, 2).map((event) => (
          <Box
            key={event.id}
            sx={{
              backgroundColor: getEventColor(event.type),
              color: 'white',
              borderRadius: 1,
              padding: 0.5,
              marginBottom: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: '0.7rem',
            }}
          >
            {event.title}
          </Box>
        ))}
        {dayEvents.length > 2 && (
          <Badge badgeContent={`+${dayEvents.length - 2}`} color="primary" sx={{ marginTop: 1 }} />
        )}
      </Box>
    </Paper>
  );
});

// Componente principal
const SchoolCalendar: React.FC = () => {
  const theme = useTheme();
  const userType = useUserType();
  const isProfessor = userType === 'professor';
  const { disciplines } = useDisciplineStore();
  
  const [currentMonth, setCurrentMonth] = useState(DateTime.now());
  const [openDialog, setOpenDialog] = useState(false);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationQueue, setNotificationQueue] = useState<{
    open: boolean, 
    message: string, 
    severity: 'success' | 'error' | 'info' | 'warning'
  }[]>([]);
  const [currentNotification, setCurrentNotification] = useState<{
    open: boolean, 
    message: string, 
    severity: 'success' | 'error' | 'info' | 'warning'
  } | null>(null);

  const { events, addEvent, updateEvent, deleteEvent, markAsNotified } = useCalendarStore();

  // Função para adicionar notificação à fila
  const addNotification = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    const newNotification = { open: true, message, severity };
    setNotificationQueue(prev => [...prev, newNotification]);
  };

  // Efeito para processar a fila de notificações
  useEffect(() => {
    if (notificationQueue.length > 0 && !currentNotification) {
      // Mostra a primeira notificação da fila
      setCurrentNotification(notificationQueue[0]);
      setNotificationQueue(prev => prev.slice(1));
    }
  }, [notificationQueue, currentNotification]);

  // Função para fechar notificação atual
  const handleCloseNotification = () => {
    setCurrentNotification(null);
  };

  const generateDays = useCallback(() => {
    const startOfMonth = currentMonth.startOf('month');
    const startDay = startOfMonth.weekday;
    const daysInMonth = currentMonth.daysInMonth || 30;

    const days = [];
    let day = 1;

    // Dias do mês anterior
    const prevMonth = currentMonth.minus({ months: 1 });
    const daysInPrevMonth = prevMonth.daysInMonth || 30;
    for (let i = 0; i < startDay; i++) {
      days.push({
        day: daysInPrevMonth - startDay + i + 1,
        currentMonth: false,
        date: prevMonth.set({ day: daysInPrevMonth - startDay + i + 1 }),
      });
    }

    // Dias do mês atual
    for (let i = 0; i < daysInMonth; i++) {
      days.push({
        day: day + i,
        currentMonth: true,
        date: currentMonth.set({ day: day + i }),
      });
    }

    // Dias do próximo mês
    const remainingDays = 42 - days.length;
    const nextMonth = currentMonth.plus({ months: 1 });
    for (let i = 0; i < remainingDays; i++) {
      days.push({
        day: i + 1,
        currentMonth: false,
        date: nextMonth.set({ day: i + 1 }),
      });
    }

    return days;
  }, [currentMonth]);

  useEffect(() => {
    const showEventNotifications = () => {
      const now = DateTime.now();
      const futureEvents = events.filter(event => {
        const eventDate = DateTime.fromISO(event.date);
        return eventDate >= now;
      });
  
      // Ordena os eventos por data mais próxima
      futureEvents.sort((a, b) => {
        const dateA = DateTime.fromISO(a.date);
        const dateB = DateTime.fromISO(b.date);
        return dateA.toMillis() - dateB.toMillis();
      });
  
      // Mostra notificação para cada evento futuro
      futureEvents.forEach((event) => {
        const eventDate = DateTime.fromISO(event.date);
        const daysDiff = eventDate.diff(now, 'days').days;
  
        let message = '';
        if (daysDiff === 0) {
          message = `Hoje: ${event.title} (${event.subject})`;
        } else if (daysDiff === 1) {
          message = `Amanhã: ${event.title} (${event.subject})`;
        } else {
          message = `Em ${Math.ceil(daysDiff)} dias: ${event.title} (${event.subject}) - ${eventDate.toFormat('dd/MM')}`;
        }
  
        // Mostra notificação independentemente do status 'notified'
        addNotification(message, 'info');
        
        // Marca como notificado apenas se ainda não foi
        if (!event.notified) {
          markAsNotified(event.id);
        }
      });
    };
  
    // Executa imediatamente ao carregar o componente
    showEventNotifications();
    
    // Configura intervalo para verificar a cada hora (opcional)
    const interval = setInterval(showEventNotifications, 3600000);
    return () => clearInterval(interval);
  }, [events, markAsNotified]);

  const handlePrevMonth = () => setCurrentMonth(currentMonth.minus({ months: 1 }));
  const handleNextMonth = () => setCurrentMonth(currentMonth.plus({ months: 1 }));

  const handleDateClick = useCallback((date: DateTime) => {
    setSelectedDate(date);
    setOpenEventDialog(true);
  }, []);

  const handleAddEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isProfessor) return;
    
    if (selectedDate) {
      setNewEvent(prev => ({
        ...prev,
        date: selectedDate.toFormat('yyyy-MM-dd'),
      }));
      setOpenDialog(true);
    } else {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleMenuClose = (date?: DateTime) => {
    if (date) {
      setSelectedDate(date);
      setNewEvent(prev => ({
        ...prev,
        date: date.toFormat('yyyy-MM-dd'),
      }));
      setOpenDialog(true);
    }
    setAnchorEl(null);
  };

  const [newEvent, setNewEvent] = useState<Omit<SchoolEvent, 'id' | 'notified'>>({
    date: DateTime.now().toFormat('yyyy-MM-dd'),
    title: '',
    description: '',
    type: 'deadline',
    subject: '',
  });

  const handleSubmit = () => {
    if (!isProfessor) return;
    
    if (!newEvent.title || !newEvent.date) {
      addNotification('Título e data são obrigatórios!', 'error');
      return;
    }

    const event: SchoolEvent = {
      ...newEvent,
      id: DateTime.now().toMillis().toString(),
      notified: false,
    };

    addEvent(event);
    setOpenDialog(false);
    setNewEvent({
      date: DateTime.now().toFormat('yyyy-MM-dd'),
      title: '',
      description: '',
      type: 'deadline',
      subject: '',
    });
    addNotification('Evento adicionado com sucesso!', 'success');
  };

  const handleEditEvent = (event: SchoolEvent) => {
    if (!isProfessor) return;
    
    setSelectedEvent(event);
    setNewEvent({
      date: event.date,
      title: event.title,
      description: event.description,
      type: event.type,
      subject: event.subject,
    });
    setOpenDialog(true);
  };

  const handleUpdateEvent = () => {
    if (!isProfessor || !selectedEvent || !newEvent.title) {
      addNotification('Título é obrigatório!', 'error');
      return;
    }

    updateEvent(selectedEvent.id, {
      ...newEvent,
    });
    setOpenDialog(false);
    setSelectedEvent(null);
    addNotification('Evento atualizado com sucesso!', 'success');
  };

  const handleDeleteEvent = (id: string) => {
    if (!isProfessor) return;
    
    deleteEvent(id);
    setOpenEventDialog(false);
    addNotification('Evento removido com sucesso!', 'success');
  };

  const getEventsForDay = useCallback((date: DateTime) => {
    const dateStr = date.toFormat('yyyy-MM-dd');
    return events.filter((event) => event.date === dateStr);
  }, [events]);

  const getEventColor = useCallback((type: EventType) => {
    switch (type) {
      case 'deadline': return theme.palette.error.main;
      case 'test': return theme.palette.warning.main;
      case 'presentation': return theme.palette.success.main;
      default: return theme.palette.primary.main;
    }
  }, [theme]);

  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const days = useMemo(() => generateDays(), [generateDays]);
  const eventsForSelectedDate = useMemo(() => 
    selectedDate ? getEventsForDay(selectedDate) : []
  , [selectedDate, getEventsForDay]);

  const renderEventActions = (event: SchoolEvent) => {
    if (!isProfessor) return null;

    return (
      <Box>
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => handleEditEvent(event)}
        >
          <Edit />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleDeleteEvent(event.id)}
        >
          <Delete />
        </IconButton>
      </Box>
    );
  };

  const renderAddEventButton = () => {
    if (!isProfessor) return null;

    return (
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleAddEvent}
      >
        Adicionar Evento
      </Button>
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      <Snackbar
        open={currentNotification?.open || false}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        key={currentNotification?.message}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={currentNotification?.severity || 'info'}
          sx={{ width: '100%' }}
        >
          {currentNotification?.message}
        </Alert>
      </Snackbar>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Calendário Escolar
        </Typography>
        <Box>
          {renderAddEventButton()}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button onClick={handlePrevMonth}>&lt; Mês Anterior</Button>
        <Typography variant="h5" component="h2">
          {currentMonth.toFormat('MMMM yyyy')}
        </Typography>
        <Button onClick={handleNextMonth}>Próximo Mês &gt;</Button>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1} mb={1}>
        {daysOfWeek.map((day) => (
          <Paper key={day} elevation={0} sx={{ textAlign: 'center', p: 1, fontWeight: 'bold' }}>
            {day}
          </Paper>
        ))}
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
        {days.map((dayObj, index) => (
          <Box key={`day-${index}`} sx={{ minHeight: 100 }}>
            <DayCell
              dayObj={dayObj}
              handleDateClick={handleDateClick}
              getEventsForDay={getEventsForDay}
              getEventColor={getEventColor}
            />
          </Box>
        ))}
      </Box>

      {/* Diálogo para visualizar eventos do dia */}
      <Dialog
        open={openEventDialog}
        onClose={() => setOpenEventDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Eventos para {selectedDate?.toFormat('dd/MM/yyyy')}
          <IconButton
            aria-label="close"
            onClick={() => setOpenEventDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {eventsForSelectedDate.length === 0 ? (
            <Typography>Nenhum evento agendado para este dia.</Typography>
          ) : (
            <List>
              {eventsForSelectedDate.map((event) => (
                <React.Fragment key={event.id}>
                  <ListItem
                    secondaryAction={renderEventActions(event)}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <EventIcon
                            sx={{
                              color: getEventColor(event.type),
                              mr: 1,
                            }}
                          />
                          <Typography fontWeight="bold">{event.title}</Typography>
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2">
                            {event.subject} - {event.type}
                          </Typography>
                          <Typography variant="body2">{event.description}</Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEventDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para adicionar/editar evento (apenas para professores) */}
      {isProfessor && (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>
            {selectedEvent ? 'Editar Evento' : 'Adicionar Evento'}
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Título"
              fullWidth
              value={newEvent.title}
              onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
            />
            <TextField
              margin="dense"
              label="Matéria"
              select
              fullWidth
              value={newEvent.subject}
              onChange={(e) => setNewEvent(prev => ({ ...prev, subject: e.target.value }))}
            >
              {disciplines.map((discipline) => (
                <MenuItem key={discipline.id} value={discipline.nome}>
                  {discipline.nome}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              label="Data"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newEvent.date}
              onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
            />
            <TextField
              margin="dense"
              label="Tipo"
              select
              fullWidth
              value={newEvent.type}
              onChange={(e) =>
                setNewEvent(prev => ({ ...prev, type: e.target.value as EventType }))
              }
            >
              <MenuItem value="deadline">Relatorio</MenuItem>
              <MenuItem value="test">Prova</MenuItem>
              <MenuItem value="presentation">Apresentação</MenuItem>
            </TextField>
            <TextField
              margin="dense"
              label="Descrição"
              multiline
              rows={4}
              fullWidth
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent(prev => ({ ...prev, description: e.target.value }))
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            {selectedEvent ? (
              <Button onClick={handleUpdateEvent} color="primary">
                Atualizar
              </Button>
            ) : (
              <Button onClick={handleSubmit} color="primary">
                Adicionar
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default SchoolCalendar;