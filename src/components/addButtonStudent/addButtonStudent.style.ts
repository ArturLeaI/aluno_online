import { SxProps, Theme } from '@mui/material';

export const getButtonStyles = (
  floatRight: boolean,
  customSx?: SxProps<Theme>
): SxProps<Theme> => ({
  gap: 1,
  textTransform: 'none',
  borderRadius: '4px',
  fontWeight: 'bold',
  marginBottom: '15px',
  ...(floatRight && { ml: 'auto' }),
  ...customSx,
});