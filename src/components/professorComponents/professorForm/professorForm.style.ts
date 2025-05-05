import { SxProps } from '@mui/material';

export const containerStyles: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: 2
};

export const paperStyles: SxProps = {
  padding: 4,
  width: '100%',
  maxWidth: 800
};

export const titleStyles: SxProps = {
  marginBottom: 3,
  fontWeight: 'bold'
};

export const formStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3
};

export const fieldsContainerStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3
};

export const buttonContainerStyles: SxProps = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 2,
  marginTop: 3
};

export const cancelButtonStyles: SxProps = {
  width: 120
};

export const saveButtonStyles: SxProps = {
  width: 120
};