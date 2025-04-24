import React from 'react';

export interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string | number | object;
  maxWidth?: string | number;
}
