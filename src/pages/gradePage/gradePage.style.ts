import { SxProps, Theme } from '@mui/material';

export const containerStyles: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  backgroundColor: '#f5f5f5',
  p: 2
};

export const paperStyles: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  p: 3,
  boxShadow: '0px 2px 10px rgba(0,0,0,0.1)'
};

export const titleStyles: SxProps<Theme> = {
  mb: 3,
  fontWeight: 'bold',
  color: '#333'
};

export const tableContainerStyles: SxProps<Theme> = {
  maxHeight: 500,
  overflow: 'auto',
  mt: 2
};

export const buttonContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 2,
  pt: 2,
  borderTop: '1px solid #eee'
};

export const searchButtonStyles: SxProps<Theme> = {
  textTransform: 'none',
  px: 3
};

export const formStyles: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    mb: 3
  };

  export const saveButtonStyles: SxProps<Theme> = {
    textTransform: 'none',
    px: 3,
    backgroundColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#388e3c',
    },
    '&.Mui-disabled': {
      backgroundColor: '#e0e0e0'
    }
  };