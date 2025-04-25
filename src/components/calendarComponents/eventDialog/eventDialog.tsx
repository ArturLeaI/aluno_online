import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Typography
} from '@mui/material';
import { DateTime } from 'luxon';
import { useCalendarStore } from '../../../store/calendarStore/calendarStore';
import { EventDialogProps, EventForm, EventType } from './eventDialog.type';
import { errorTextStyles, textFieldStyles, dialogStyles } from './eventDialog.style';

export const EventDialog: React.FC<EventDialogProps> = ({
  open, onClose, disciplines, initialDate
}) => {
  const [event, setEvent] = useState<EventForm>({
    title: '',
    date: initialDate || DateTime.now().toISODate() || '',
    type: 'Relatorio',
    subject: '',
    description: ''
  });

  const addEvent = useCalendarStore((state) => state.addEvent);

  useEffect(() => {
    if (open) {
      setEvent({
        title: '',
        date: initialDate || DateTime.now().toISODate() || '',
        type: 'Relatorio',
        subject: disciplines.length > 0 ? disciplines[0].name : '',
        description: ''
      });
    }
  }, [open, initialDate, disciplines]);

  const handleSubmit = () => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
      notified: false,
      date: new Date(event.date).toISOString().split('T')[0]
    };
    
    addEvent(newEvent);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: dialogStyles.paper }}>
      <DialogTitle>Adicionar Evento</DialogTitle>
      <DialogContent>
        {disciplines.length === 0 && (
          <Typography color="error" sx={errorTextStyles}>
            Nenhuma disciplina cadastrada. Cadastre disciplinas primeiro.
          </Typography>
        )}

        <TextField
          label="Título do Evento"
          fullWidth
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
          sx={textFieldStyles}
          margin="normal"
        />

        <TextField
          label="Data"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={event.date}
          onChange={(e) => setEvent({ ...event, date: e.target.value })}
          sx={textFieldStyles}
          margin="normal"
        />

        <TextField
          label="Tipo de Evento"
          select
          fullWidth
          value={event.type}
          onChange={(e) => setEvent({ ...event, type: e.target.value as EventType })}
          sx={textFieldStyles}
          margin="normal"
        >
          <MenuItem value="Relatorio">Relatório</MenuItem>
          <MenuItem value="Prova">Prova</MenuItem>
          <MenuItem value="Apresentação">Apresentação</MenuItem>
        </TextField>

        <TextField
          label="Disciplina"
          select
          fullWidth
          value={event.subject}
          onChange={(e) => setEvent({ ...event, subject: e.target.value })}
          disabled={disciplines.length === 0}
          sx={textFieldStyles}
          margin="normal"
        >
          {disciplines.map((discipline) => (
            <MenuItem key={discipline.id} value={discipline.name}>
              {discipline.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Descrição"
          multiline
          rows={4}
          fullWidth
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={disciplines.length === 0}
        >
          Salvar Evento
        </Button>
      </DialogActions>
    </Dialog>
  );
};