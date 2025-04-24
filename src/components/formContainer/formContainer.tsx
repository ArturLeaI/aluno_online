import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

interface FormContainerProps {
  title: string;
  onSubmit: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  title,
  onSubmit,
  onCancel,
  children
}) => {
  return (
    <Box sx={{ /* estilos comuns */ }}>
      <Paper sx={{ /* estilos comuns */ }}>
        <Typography variant="h6" sx={{ /* estilos comuns */ }}>
          {title}
        </Typography>

        <Box component="form" onSubmit={onSubmit} sx={{ /* estilos comuns */ }}>
          {children}
          
          <Box sx={{ /* estilos dos botões */ }}>
            <Button variant="outlined" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};