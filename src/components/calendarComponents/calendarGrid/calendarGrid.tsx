import React, { useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import { DateTime } from 'luxon';
import { DayCell } from '../dayCell/dayCell';
import { CalendarGridProps } from './calendarGrid.type';

export const CalendarGrid: React.FC<CalendarGridProps> = ({
    currentMonth,
    events,
    isProfessor,
    onDateClick
}) => {
    const generateDays = useCallback(() => {
        const startOfMonth = currentMonth.startOf('month');
        const startDay = startOfMonth.weekday;
        const daysInMonth = currentMonth.daysInMonth || 30;

        const days = [];
        let day = 1;

        const prevMonth = currentMonth.minus({ months: 1 });
        const daysInPrevMonth = prevMonth.daysInMonth || 30;
        for (let i = 0; i < startDay; i++) {
            days.push({
                day: daysInPrevMonth - startDay + i + 1,
                currentMonth: false,
                date: prevMonth.set({ day: daysInPrevMonth - startDay + i + 1 }),
            });
        }

        for (let i = 0; i < daysInMonth; i++) {
            days.push({
                day: day + i,
                currentMonth: true,
                date: currentMonth.set({ day: day + i }),
            });
        }

        const remainingDays = 42 - days.length;
        const nextMonth = currentMonth.plus({ months: 1 });
        for (let i = 0; i < remainingDays; i++) {
            days.push({
                day: i + 1,
                currentMonth: false,
                date: nextMonth.set({ day: i + 1 }),
            });
        }

        return days;
    }, [currentMonth]);

    const getEventsForDay = useCallback((date: DateTime) => {
        return events.filter((event) => event.date === date.toFormat('yyyy-MM-dd'));
    }, [events]);

    const getEventColor = (type: string) => {
        const colors = {
            deadline: '#f44336',
            test: '#ff9800',
            presentation: '#4caf50'
        };
        return colors[type as keyof typeof colors] || '#2196f3';
    };

    const days = useMemo(() => generateDays(), [generateDays]);

    const renderDayCells = () => {
        return days.map((dayObj, index) => (
            <Box key={`day-${index}`} sx={{ minHeight: 100 }}>
                <DayCell
                    dayObj={dayObj}
                    getEventsForDay={getEventsForDay}
                    getEventColor={getEventColor}
                    isProfessor={isProfessor} 
                    onDateClick={onDateClick}
                />
            </Box>
        ));
    };

    return (
        <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
            {renderDayCells()}
        </Box>
    );
};