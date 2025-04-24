// src/components/enrollmentModal/enrollmentModal.styles.ts
import { SxProps, Theme } from '@mui/material';

export const styles = {
  modalContent: {
    maxHeight: 300,
    overflow: 'auto',
    mb: 3
  },
  disciplinePaper: (isSelected: boolean, isEnrolled: boolean, readOnly: boolean) => ({
    p: 2,
    mb: 1,
    border: (theme: Theme) => `1px solid ${
      isSelected 
        ? theme.palette.primary.main 
        : isEnrolled 
          ? theme.palette.success.light 
          : theme.palette.divider
    }`,
    borderRadius: 1,
    cursor: isEnrolled || readOnly ? 'default' : 'pointer',
    backgroundColor: (theme: Theme) => 
      isSelected
        ? theme.palette.action.selected
        : isEnrolled
          ? theme.palette.action.disabledBackground
          : theme.palette.background.paper,
    '&:hover': {
      backgroundColor: (theme: Theme) => 
        isEnrolled || readOnly 
          ? theme.palette.action.disabledBackground 
          : theme.palette.action.hover
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