import { SxProps, Theme } from '@mui/material/styles';

export const containerStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
  width: '100%',
  gap: 2,
};

export const textFieldStyle: SxProps<Theme> = {
  flexGrow: 1,
  maxWidth: 500,
};
