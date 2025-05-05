import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { CalendarHeaderProps } from './calendarHeader.type';
import { headerContainerStyles, addButtonStyles } from './calendarHeader.style';

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  isProfessor, 
  onAddEvent 
}) => {
  const renderAddEventButton = () => {
    if (!isProfessor || !onAddEvent) return null;
    
    return (
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<Add />} 
        onClick={onAddEvent}
        sx={addButtonStyles}
      >
        Adicionar Evento
      </Button>
    );
  };

  return (
    <Box sx={headerContainerStyles}>
      <Typography variant="h4" component="h1">
        Calendário Escolar
      </Typography>
      
      {renderAddEventButton()}
    </Box>
  );
};