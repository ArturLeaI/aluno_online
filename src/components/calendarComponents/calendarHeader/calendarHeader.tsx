import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

interface CalendarHeaderProps {
  isProfessor: boolean;
  onAddEvent?: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  isProfessor, 
  onAddEvent 
}) => {
  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      mb: 3
    }}>
      <Typography variant="h4" component="h1">Calendário Escolar</Typography>
      
      {isProfessor && onAddEvent && (
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Add />} 
          onClick={onAddEvent}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Adicionar Evento
        </Button>
      )}
    </Box>
  );
};