import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Divider, IconButton, Box, Typography } from '@mui/material';
import { Delete, Close, Event as EventIcon, Add } from '@mui/icons-material';
import { DateTime } from 'luxon';
import { EventListDialogProps } from './eventListDialog.type';
import { closeButtonStyles, eventHeaderStyles, eventIconStyles, dialogActionsStyles, emptyStateStyles, secondaryActionStyles,addButtonStyles} from './eventListDialog.style';
import { EventDialog } from '../eventDialog/eventDialog';
import { SchoolEvent } from '../../../pages/calendarPage/calendarPage.type';

export const EventListDialog: React.FC<EventListDialogProps> = ({
  open, onClose, selectedDate, events, 
  getEventColor, isProfessor, onDeleteEvent, disciplines
}) => {
  const [addEventOpen, setAddEventOpen] = useState(false);
  
  const filteredEvents = selectedDate
    ? events.filter(event => DateTime.fromISO(event.date).hasSame(selectedDate, 'day'))
    : [];

  const handleDelete = (id: string) => {
    if (isProfessor && onDeleteEvent) onDeleteEvent(id);
  };

  const renderEmptyState = () => (
    <Typography sx={emptyStateStyles}>Nenhum evento agendado para este dia.</Typography>
  );

  const renderEventList = () => (
    <List>
      {filteredEvents.map((event) => (
        <React.Fragment key={event.id}>
          <ListItem 
            secondaryAction={renderSecondaryAction(event.id)}
          >
            <ListItemText
              primary={renderEventPrimary(event)}
              secondary={renderEventSecondary(event)}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );

  const renderSecondaryAction = (eventId: string) => (
    isProfessor && (
      <Box sx={secondaryActionStyles}>
        <IconButton onClick={() => handleDelete(eventId)} color="error">
          <Delete />
        </IconButton>
      </Box>
    )
  );

  const renderEventPrimary = (event: SchoolEvent) => (
    <Box sx={eventHeaderStyles}>
      <EventIcon sx={eventIconStyles(getEventColor(event.type))} />
      <Typography fontWeight="bold">{event.title}</Typography>
    </Box>
  );

  const renderEventSecondary = (event: SchoolEvent) => (
    <>
      <Typography variant="body2">{event.subject} - {event.type}</Typography>
      <Typography variant="body2">{event.description}</Typography>
    </>
  );

  const renderAddButton = () => (
    isProfessor && (
      <Button 
        onClick={() => setAddEventOpen(true)}
        startIcon={<Add />}
        sx={addButtonStyles}
        variant="contained"
      >
        Adicionar Evento
      </Button>
    )
  );

  const renderEventDialog = () => (
    selectedDate && (
      <EventDialog
        open={addEventOpen}
        onClose={() => setAddEventOpen(false)}
        disciplines={disciplines}
        initialDate={selectedDate.toISODate()}
      />
    )
  );

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Eventos para {selectedDate?.toFormat('dd/MM/yyyy')}
          <IconButton onClick={onClose} sx={closeButtonStyles}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          {filteredEvents.length === 0 ? renderEmptyState() : renderEventList()}
        </DialogContent>
        
        <DialogActions sx={dialogActionsStyles}>
          {renderAddButton()}
          <Button onClick={onClose}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {renderEventDialog()}
    </>
  );
};