import React, { ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';

interface CardDefault extends BoxProps {
  children: ReactNode;
}

const CardDefault: React.FC<CardDefault> = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
        background: '#fff',
        boxShadow: '0 1px 4px rgba(0, 0, 0, .15)',
        borderRadius: '6px',
        marginBottom: '8px',
        marginTop: '15px',
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
};

export default CardDefault;