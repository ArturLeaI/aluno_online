import React from 'react';
import { Paper, Box, Typography, Badge } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { DateTime } from 'luxon';
import { DayCellProps } from './dayCell.type';
import { paperStyles, dayNumberStyles, eventItemStyles, headerBoxStyles, eventsBoxStyles, badgeStyles } from './dayCell.style';

export const DayCell: React.FC<DayCellProps> = ({
    dayObj,
    getEventsForDay,
    getEventColor,
    isProfessor,
    onDateClick
}) => {
    const dayEvents = React.useMemo(() => getEventsForDay(dayObj.date), [dayObj.date, getEventsForDay]);
    const isToday = dayObj.date.hasSame(DateTime.now(), 'day');

    const handleClick = () => {
        onDateClick(dayObj.date); 
    };

    return (
        <Paper
            elevation={isToday ? 3 : 0}
            sx={paperStyles(isToday, dayObj.currentMonth, isProfessor)}
            onClick={handleClick}
        >
            <Box sx={headerBoxStyles}>
                <Typography variant="body2" sx={dayNumberStyles(isToday, dayObj.currentMonth)}>
                    {dayObj.day}
                </Typography>
                {dayEvents.length > 0 && (
                    <Notifications fontSize="small" sx={{ color: getEventColor(dayEvents[0].type), marginLeft: 1 }} />
                )}
            </Box>

            <Box sx={eventsBoxStyles}>
                {dayEvents.slice(0, 2).map((event) => (
                    <Box
                        key={event.id}
                        sx={eventItemStyles(getEventColor(event.type))}
                    >
                        {event.title}
                    </Box>
                ))}
                {dayEvents.length > 2 && (
                    <Badge
                        badgeContent={`+${dayEvents.length - 2}`}
                        color="primary"
                        sx={badgeStyles}
                    />
                )}
            </Box>
        </Paper>
    );
};