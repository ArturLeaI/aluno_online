import { DateTime } from 'luxon';
import { SchoolEvent } from '../../../pages/calendarPage/calendarPage.type';

export interface CalendarGridProps {
    currentMonth: DateTime;
    events: SchoolEvent[];
    isProfessor: boolean;
    onDateClick: (date: DateTime) => void;
}

export interface DayObject {
    day: number;
    currentMonth: boolean;
    date: DateTime;
}