import { SxProps } from '@mui/material';

export const styles = {
  root: {
    backgroundColor: '#fff',
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
    },
  } as SxProps,
};