import { SxProps } from '@mui/material';

export const gridContainerStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 1
};

export const dayCellStyles: SxProps = {
    minHeight: 100
};

export const getEventColor = (type: string): string => {
    const colors = {
        deadline: '#f44336',
        test: '#ff9800',
        presentation: '#4caf50'
    };
    return colors[type as keyof typeof colors] || '#2196f3';
};