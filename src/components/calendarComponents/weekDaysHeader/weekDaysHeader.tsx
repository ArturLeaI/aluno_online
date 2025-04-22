// components/WeekDaysHeader.tsx
import React from 'react';
import { Box, Paper } from '@mui/material';

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export const WeekDaysHeader: React.FC = () => {
  return (
    <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1} mb={1}>
      {daysOfWeek.map((day) => (
        <Paper key={day} elevation={0} sx={{ textAlign: 'center', p: 1, fontWeight: 'bold' }}>
          {day}
        </Paper>
      ))}
    </Box>
  );
};