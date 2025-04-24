import { SelectChangeEvent } from '@mui/material';
import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export interface SelectOption {
  value: string;
  label: string;
}

export interface GenericSelectProps {
  label: string;
  name: string;
  value?: string | string[];
  onChange?: (e: SelectChangeEvent<string | string[]>) => void;
  options: SelectOption[];
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  error?: boolean;
  helperText?: ReactNode;
  disabled?: boolean;
  multiple?: boolean;
}
