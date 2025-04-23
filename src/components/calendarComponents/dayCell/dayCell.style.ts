import { SxProps, Theme } from '@mui/material/styles';

export const paperStyles = (isToday: boolean, currentMonth: boolean, isProfessor: boolean): SxProps<Theme> => ({
    p: 1,
    height: '100%',
    flexGrow: 1,
    backgroundColor: currentMonth
        ? isToday
            ? 'action.selected'
            : 'background.paper'
        : 'action.disabledBackground',
    border: isToday ? (theme: Theme) => `2px solid ${theme.palette.primary.main}` : 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    opacity: isProfessor ? 1 : 0.9,
    '&:hover': {
        border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
        boxShadow: 1
    }
});

export const dayNumberStyles = (isToday: boolean, currentMonth: boolean): SxProps<Theme> => ({
    fontWeight: isToday ? 'bold' : 'normal',
    color: currentMonth ? 'text.primary' : 'text.secondary',
});

export const eventItemStyles = (color: string): SxProps<Theme> => ({
    backgroundColor: color,
    color: 'white',
    borderRadius: 1,
    padding: 0.5,
    marginBottom: 0.5,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '0.7rem',
});

export const headerBoxStyles: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'space-between'
};

export const eventsBoxStyles: SxProps<Theme> = {
    marginTop: 1,
    flexGrow: 1
};

export const badgeStyles: SxProps<Theme> = {
    marginTop: 1
};