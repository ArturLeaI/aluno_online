import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  IconButton, 
  Box, 
  Typography 
} from '@mui/material';
import { Edit, Delete, Close, Event as EventIcon } from '@mui/icons-material';
import { DateTime } from 'luxon';
import { SchoolEvent } from '../../../pages/calendarPage/calendarPage.type';

interface EventListDialogProps {
  open: boolean;
  selectedDate: DateTime | null;
  onClose: () => void;
  events: SchoolEvent[];
  getEventColor: (type: string) => string;
  isProfessor: boolean;
  onEditEvent?: (event: SchoolEvent) => void; // Opcional
  onDeleteEvent?: (id: string) => void;
  
}

export const EventListDialog: React.FC<EventListDialogProps> = ({
  open,
  onClose,
  selectedDate,
  events,
  getEventColor,
  isProfessor,
  onEditEvent,
  onDeleteEvent,
}) => {
  const filteredEvents = selectedDate 
    ? events.filter(event => 
        DateTime.fromISO(event.date).hasSame(selectedDate, 'day'))
    : [];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Eventos para {selectedDate?.toFormat('dd/MM/yyyy')}
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {filteredEvents.length === 0 ? (
          <Typography>Nenhum evento agendado para este dia.</Typography>
        ) : (
          <List>
            {filteredEvents.map((event) => (
              <React.Fragment key={event.id}>
                <ListItem secondaryAction={
                  isProfessor && onEditEvent && onDeleteEvent && (
                    <Box>
                      <IconButton edge="end" aria-label="edit" onClick={() => onEditEvent(event)}>
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => onDeleteEvent(event.id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  )
                }>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <EventIcon sx={{ color: getEventColor(event.type), mr: 1 }} />
                        <Typography fontWeight="bold">{event.title}</Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2">{event.subject} - {event.type}</Typography>
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
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};