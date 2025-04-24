import { OutlinedTextFieldProps } from '@mui/material';
import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export interface GenericTextFieldProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  label: string;
  name: string;
  sx?: SxProps<Theme>;
  InputLabelProps?: any;
  helperText?: ReactNode;
  multiline?: boolean;
  rows?: number | string;
}
