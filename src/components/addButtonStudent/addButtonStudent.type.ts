import { ButtonProps } from '@mui/material';
import React from 'react';

export interface AddButtonProps extends ButtonProps {
  routePath: string;       
  buttonText: string;      
  floatRight?: boolean;    
  startIcon?: React.ReactNode; 
}