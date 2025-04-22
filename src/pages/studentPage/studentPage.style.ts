import { SxProps, Theme } from '@mui/material';

export const containerStyles: SxProps<Theme> = {
  width: '100%',
  p: 3
};

export const headerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
  width: '100%',
  gap: 2
};

export const searchFieldStyles: SxProps<Theme> = {
  flexGrow: 1,
  maxWidth: 500,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#aaa',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  }
};

export const paginationStyles: SxProps<Theme> = {
  mt: 2
};

export const tableContainerStyles: SxProps<Theme> = {
  mt: 3
};
