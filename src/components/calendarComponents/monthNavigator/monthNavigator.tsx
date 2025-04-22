import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DateTime } from 'luxon';

interface MonthNavigatorProps {
  currentMonth: DateTime;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const MonthNavigator: React.FC<MonthNavigatorProps> = ({ 
  currentMonth, 
  onPrevMonth, 
  onNextMonth 
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Button onClick={onPrevMonth}>&lt; Mês Anterior</Button>
      <Typography variant="h5" component="h2">
        {currentMonth.toFormat('MMMM yyyy')}
      </Typography>
      <Button onClick={onNextMonth}>Próximo Mês &gt;</Button>
    </Box>
  );
};