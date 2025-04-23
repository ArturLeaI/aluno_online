import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { MonthNavigatorProps } from './monthNavigator.type';
import { containerStyles, monthTitleStyles } from './monthNavigator.style';

export const MonthNavigator: React.FC<MonthNavigatorProps> = ({ 
  currentMonth, 
  onPrevMonth, 
  onNextMonth 
}) => {
  return (
    <Box sx={containerStyles}>
      <Button onClick={onPrevMonth}>&lt; Mês Anterior</Button>
      <Typography sx={monthTitleStyles}>
        {currentMonth.toFormat('MMMM yyyy')}
      </Typography>
      <Button onClick={onNextMonth}>Próximo Mês &gt;</Button>
    </Box>
  );
};