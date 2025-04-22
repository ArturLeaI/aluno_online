import React from 'react';
import { Paper, Box, Typography, Badge } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { DateTime } from 'luxon';
import { DayObject, SchoolEvent, EventType } from '../../../pages/calendarPage/calendarPage.type';

interface DayCellProps {
    dayObj: DayObject;
    getEventsForDay: (date: DateTime) => SchoolEvent[];
    getEventColor: (type: EventType) => string;
    isProfessor: boolean;
    onDateClick: (date: DateTime) => void;
}

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
            sx={{
                p: 1,
                height: '100%',
                flexGrow: 1,
                backgroundColor: dayObj.currentMonth
                    ? isToday
                        ? 'action.selected'
                        : 'background.paper'
                    : 'action.disabledBackground',
                border: isToday ? (theme) => `2px solid ${theme.palette.primary.main}` : 'none',
                cursor: 'pointer', 
                display: 'flex',
                flexDirection: 'column',
                opacity: isProfessor ? 1 : 0.9,
                '&:hover': {
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    boxShadow: 1
                }
            }}
            onClick={handleClick}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: isToday ? 'bold' : 'normal',
                        color: dayObj.currentMonth ? 'text.primary' : 'text.secondary',
                    }}
                >
                    {dayObj.day}
                </Typography>
                {dayEvents.length > 0 && (
                    <Notifications fontSize="small" sx={{ color: getEventColor(dayEvents[0].type), marginLeft: 1 }} />
                )}
            </Box>

            <Box sx={{ marginTop: 1, flexGrow: 1 }}>
                {dayEvents.slice(0, 2).map((event) => (
                    <Box
                        key={event.id}
                        sx={{
                            backgroundColor: getEventColor(event.type),
                            color: 'white',
                            borderRadius: 1,
                            padding: 0.5,
                            marginBottom: 0.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: '0.7rem',
                        }}
                    >
                        {event.title}
                    </Box>
                ))}
                {dayEvents.length > 2 && (
                    <Badge
                        badgeContent={`+${dayEvents.length - 2}`}
                        color="primary"
                        sx={{ marginTop: 1 }}
                    />
                )}
            </Box>
        </Paper>
    );
};