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
  mb: 1,
  fontWeight: 'bold',
  color: '#333'
};

export const formStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  height: 'calc(100% - 40px)'
};

export const fieldsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  margin: '5px',
  gap: 2,
  flexGrow: 1,
  overflowY: 'auto',
  pr: 1,
  pt: 2
};

export const buttonContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 2,
  pt: 2,
  borderTop: '1px solid #eee'
};

export const cancelButtonStyles: SxProps<Theme> = {
  textTransform: 'none',
  px: 3,
  color: '#333',
  borderColor: '#ccc'
};

export const saveButtonStyles: SxProps<Theme> = {
  textTransform: 'none',
  px: 3,
  backgroundColor: '#1976d2',
  '&:hover': { backgroundColor: '#1565c0' }
};