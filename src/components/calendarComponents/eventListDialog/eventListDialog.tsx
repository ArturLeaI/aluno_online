import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Divider, IconButton, Box, Typography } from '@mui/material';
import { Delete, Close, Event as EventIcon } from '@mui/icons-material';
import { DateTime } from 'luxon';
import { EventListDialogProps } from './eventListDialog.type';
import { closeButtonStyles, eventHeaderStyles, eventIconStyles, dialogActionsStyles, emptyStateStyles, secondaryActionStyles } from './eventListDialog.style';

export const EventListDialog: React.FC<EventListDialogProps> = ({
  open, onClose, selectedDate, events, getEventColor, isProfessor, onDeleteEvent }) => {
  const filteredEvents = selectedDate
    ? events.filter(event =>
        DateTime.fromISO(event.date).hasSame(selectedDate, 'day'))
    : [];
  
  const handleDelete = (id: string) => {
    if (isProfessor && onDeleteEvent) {
      onDeleteEvent(id);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Eventos para {selectedDate?.toFormat('dd/MM/yyyy')}
        <IconButton onClick={onClose} sx={closeButtonStyles}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {filteredEvents.length === 0 ? (
          <Typography sx={emptyStateStyles}>Nenhum evento agendado para este dia.</Typography>
        ) : (
          <List>
            {filteredEvents.map((event) => (
              <React.Fragment key={event.id}>
                <ListItem secondaryAction={
                  isProfessor && (
                    <Box sx={secondaryActionStyles}>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(event.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  )
                }>
                  <ListItemText
                    primary={
                      <Box sx={eventHeaderStyles}>
                        <EventIcon sx={eventIconStyles(getEventColor(event.type))} />
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
      <DialogActions sx={dialogActionsStyles}>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};