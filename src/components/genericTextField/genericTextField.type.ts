import { OutlinedTextFieldProps } from '@mui/material';
import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { InputLabelProps as MuiInputLabelProps } from '@mui/material/InputLabel';

export interface GenericTextFieldProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  label: string;
  name: string;
  sx?: SxProps<Theme>;
  InputLabelProps?: Partial<MuiInputLabelProps>;
  helperText?: ReactNode;
  multiline?: boolean;
  rows?: number | string;
}
