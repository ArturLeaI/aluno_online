import React from 'react';
import { Paper, Box, Typography, Badge } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { DateTime } from 'luxon';
import { DayCellProps } from './dayCell.type';
import { paperStyles, dayNumberStyles, eventItemStyles, headerBoxStyles, eventsBoxStyles, badgeStyles } from './dayCell.style';
import { EventType } from '../eventDialog/eventDialog.type';

export const DayCell: React.FC<DayCellProps> = ({
    dayObj,
    getEventsForDay,
    isProfessor,
    onDateClick
}) => {
    const dayEvents = React.useMemo(() => getEventsForDay(dayObj.date), [dayObj.date, getEventsForDay]);
    const isToday = dayObj.date.hasSame(DateTime.now(), 'day');
    
    const EVENT_COLORS: Record<EventType, string> = {
        Relatorio: '#FF9800',
        Prova: '#F44336',
        Apresentação: '#2196F3',
    };
      
    const getEventColor = (type: EventType): string => EVENT_COLORS[type] || '#9E9E9E';

    const handleClick = () => {
        onDateClick(dayObj.date); 
    };

    const renderDayNumber = () => (
        <Typography variant="body2" sx={dayNumberStyles(isToday, dayObj.currentMonth)}>
            {dayObj.day}
        </Typography>
    );

    const renderEventIndicator = () => {
        if (dayEvents.length === 0) return null;
        return (
            <Notifications 
                fontSize="small" 
                sx={{ color: getEventColor(dayEvents[0].type), marginLeft: 1 }} 
            />
        );
    };

    const renderEventItems = () => (
        dayEvents.slice(0, 2).map((event) => (
            <Box key={event.id} sx={eventItemStyles(getEventColor(event.type))}>
                {event.title}
            </Box>
        ))
    );

    const renderAdditionalEventsBadge = () => {
        if (dayEvents.length <= 2) return null;
        return (
            <Badge 
                badgeContent={`+${dayEvents.length - 2}`} 
                color="primary" 
                sx={badgeStyles} 
            />
        );
    };

    const renderEvents = () => (
        <Box sx={eventsBoxStyles}>
            {renderEventItems()}
            {renderAdditionalEventsBadge()}
        </Box>
    );

    return (
        <Paper
            elevation={isToday ? 3 : 0}
            sx={paperStyles(isToday, dayObj.currentMonth, isProfessor)}
            onClick={handleClick}
        >
            <Box sx={headerBoxStyles}>
                {renderDayNumber()}
                {renderEventIndicator()}
            </Box>
            {renderEvents()}
        </Paper>
    );
};