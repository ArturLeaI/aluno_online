import { SxProps } from '@mui/material';

export const closeButtonStyles: SxProps = {
  position: 'absolute',
  right: 8,
  top: 8
};

export const eventHeaderStyles: SxProps = {
  display: 'flex',
  alignItems: 'center'
};

export const eventIconStyles = (color: string): SxProps => ({
  color: color,
  mr: 1
});

export const dialogActionsStyles: SxProps = {
  p: 2
};

export const emptyStateStyles: SxProps = {
  p: 2,
  textAlign: 'center'
};

export const secondaryActionStyles: SxProps = {
  display: 'flex',
  gap: 1
};