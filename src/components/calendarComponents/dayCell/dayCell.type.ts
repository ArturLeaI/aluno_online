import { DateTime } from 'luxon';
import { SchoolEvent, EventType } from '../../../pages/calendarPage/calendarPage.type';

export interface DayObject {
    day: number;
    currentMonth: boolean;
    date: DateTime;
}

export interface DayCellProps {
    dayObj: DayObject;
    getEventsForDay: (date: DateTime) => SchoolEvent[];
    getEventColor: (type: EventType) => string;
    isProfessor: boolean;
    onDateClick: (date: DateTime) => void;
}