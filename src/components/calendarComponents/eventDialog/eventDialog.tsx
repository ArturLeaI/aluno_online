import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  MenuItem,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { Discipline } from '../../../pages/calendarPage/calendarPage.type';
import { useCalendarStore } from '../../../store/calendarStore';

interface EventDialogProps {
    open: boolean;
    onClose: () => void;
    disciplines: Discipline[];
}

export const EventDialog: React.FC<EventDialogProps> = ({
    open,
    onClose,
    disciplines
}) => {
    const [event, setEvent] = useState({
        title: '',
        date: DateTime.now().toISODate() || '',
        type: 'deadline' as const,
        subject: '',
        description: ''
    });

    const addEvent = useCalendarStore((state) => state.addEvent);
    useEffect(() => {
        if (open) {
            
            setEvent(prev => ({
                ...prev,
                subject: disciplines.length > 0 ? disciplines[0].name : '',
                date: DateTime.now().toISODate() || ''
            }));
        }
    }, [open, disciplines]);
    
    
    const handleSubmit = () => {
    
        const newEvent = {
            ...event,
            id: Date.now().toString(),
            notified: false,
        };
    
        addEvent(newEvent);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Adicionar Evento</DialogTitle>
            <DialogContent>
                {disciplines.length === 0 && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        Nenhuma disciplina cadastrada. Cadastre disciplinas primeiro.
                    </Typography>
                )}

                <TextField
                    margin="normal"
                    label="Título do Evento"
                    fullWidth
                    value={event.title}
                    onChange={(e) => setEvent({ ...event, title: e.target.value })}
                    sx={{ mb: 2 }}
                />
                
                <TextField
                    margin="normal"
                    label="Data"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={event.date}
                    onChange={(e) => setEvent({ ...event, date: e.target.value })}
                    sx={{ mb: 2 }}
                />
                
                <TextField
                    margin="normal"
                    label="Tipo de Evento"
                    select
                    fullWidth
                    value={event.type}
                    onChange={(e) => setEvent({ ...event, type: e.target.value as any })}
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="Relatorio">Relatorio</MenuItem>
                    <MenuItem value="Prova">Prova</MenuItem>
                    <MenuItem value="Apresentação">Apresentação</MenuItem>
                </TextField>
                
                <TextField
                    margin="normal"
                    label="Disciplina"
                    select
                    fullWidth
                    value={event.subject}
                    onChange={(e) => setEvent({ ...event, subject: e.target.value })}
                    disabled={disciplines.length === 0}
                    sx={{ mb: 2 }}
                >
                    {disciplines.map((discipline) => (
                        <MenuItem key={`${discipline.id}-${discipline.name}`} value={discipline.name}>
                            {discipline.name}
                        </MenuItem>
                    ))}
                </TextField>
                
                <TextField
                    margin="normal"
                    label="Descrição"
                    multiline
                    rows={4}
                    fullWidth
                    value={event.description}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
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