import { SxProps, Theme } from '@mui/material';

export const buttonStyles: SxProps<Theme> = {
  textTransform: 'none',
};

export const paperStyles: SxProps<Theme> = {
  p: 2,
  mb: 3,
  borderRadius: 1,
};

export const filterContainerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  flexWrap: 'wrap',
};

export const formControlStyles: SxProps<Theme> = {
  minWidth: 200,
};
