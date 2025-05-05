import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Typography
} from '@mui/material';
import { DateTime } from 'luxon';
import { useCalendarStore } from '../../../store/calendarStore/calendarStore';
import { EventDialogProps, EventForm } from './eventDialog.type';
import { errorTextStyles, textFieldStyles, dialogStyles } from './eventDialog.style';
import { eventsTypes } from '../../../mock/eventsTypes';



export const EventDialog: React.FC<EventDialogProps> = ({
  open, onClose, disciplines, initialDate
}) => {
  const [event, setEvent] = useState<EventForm>({
    title: '',
    date: initialDate || DateTime.now().toISODate() || '',
    type: 'Relatorio',
    subject: disciplines.length > 0 ? disciplines[0].name : '',
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

  const handleChange = (field: keyof EventForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({ ...event, [field]: e.target.value });
  };

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

  const renderTextField = (
    field: keyof EventForm,
    label: string,
    options?: {
      type?: string;
      multiline?: boolean;
      rows?: number;
      select?: boolean;
      disabled?: boolean;
      children?: React.ReactNode;
    }
  ) => (
    <TextField
      label={label}
      fullWidth
      value={event[field]}
      onChange={handleChange(field)}
      sx={textFieldStyles}
      margin="normal"
      InputLabelProps={options?.type === 'date' ? { shrink: true } : undefined}
      {...options}
    />
  );

  const renderErrorAndFields = () => {
    const hasNoDisciplines = disciplines.length === 0;

    return (
      <>
        {hasNoDisciplines && (
          <Typography color="error" sx={errorTextStyles}>
            Nenhuma disciplina cadastrada. Cadastre disciplinas primeiro.
          </Typography>
        )}

        {renderTextField('title', 'Título do Evento')}
        
        {renderTextField('date', 'Data', { type: 'date' })}

        {renderTextField('type', 'Tipo de Evento', {
          select: true,
          children: eventsTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))
        })}

        {renderTextField('subject', 'Disciplina', {
          select: true,
          disabled: hasNoDisciplines,
          children: disciplines.map((discipline) => (
            <MenuItem key={discipline.id} value={discipline.name}>
              {discipline.name}
            </MenuItem>
          ))
        })}

        {renderTextField('description', 'Descrição', { multiline: true, rows: 4 })}
      </>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: dialogStyles.paper }}>
      <DialogTitle>Adicionar Evento</DialogTitle>
      <DialogContent>
        {renderErrorAndFields()}
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