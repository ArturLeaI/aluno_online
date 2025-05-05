// src/components/enrollmentModal/enrollmentModal.styles.ts
import { SxProps, Theme } from '@mui/material';

const getBorderColor = (theme: Theme, isSelected: boolean, isEnrolled: boolean) => {
  if (isSelected) return theme.palette.primary.main;
  if (isEnrolled) return theme.palette.success.light;
  return theme.palette.divider;
};

const getBackgroundColor = (theme: Theme, isSelected: boolean, isEnrolled: boolean) => {
  if (isSelected) return theme.palette.action.selected;
  if (isEnrolled) return theme.palette.action.disabledBackground;
  return theme.palette.background.paper;
};

const getHoverBackgroundColor = (theme: Theme, isEnrolled: boolean, readOnly: boolean) => {
  if (isEnrolled || readOnly) return theme.palette.action.disabledBackground;
  return theme.palette.action.hover;
};

export const styles = {
  modalContent: {
    maxHeight: 300,
    overflow: 'auto',
    mb: 3
  },
  disciplinePaper: (isSelected: boolean, isEnrolled: boolean, readOnly: boolean) => ({
    p: 2,
    mb: 1,
    border: (theme: Theme) => `1px solid ${getBorderColor(theme, isSelected, isEnrolled)}`,
    borderRadius: 1,
    cursor: isEnrolled || readOnly ? 'default' : 'pointer',
    backgroundColor: (theme: Theme) => getBackgroundColor(theme, isSelected, isEnrolled),
    '&:hover': {
      backgroundColor: (theme: Theme) => getHoverBackgroundColor(theme, isEnrolled, readOnly)
    }
  }) as SxProps,
  disciplineHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  disciplineName: {
    flexGrow: 1,
    fontWeight: 'medium'
  },
  disciplineDetails: {
    variant: 'body2',
    color: 'text.secondary'
  },
  selectedDisciplinesContainer: {
    mb: 3
  },
  selectedDisciplinesLabel: {
    variant: 'subtitle2',
    mb: 1
  },
  chipsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2
  },
  button: {
    textTransform: 'none'
  }
};