import { SxProps, Theme } from '@mui/material/styles';

export const personalInfoBoxStyle: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
  gap: 3,
  mb: 3
};

export const sectionTitleStyle: SxProps<Theme> = {
  mb: 2,
  fontWeight: 'bold'
};

export const tableContainerStyle: SxProps<Theme> = {
  mt: 2
};

export const tableRowHeaderStyle: SxProps<Theme> = {
  backgroundColor: '#f5f5f5'
};

export const chipStyle: SxProps<Theme> = {
  fontWeight: 'bold'
};
