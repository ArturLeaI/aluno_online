import { DateTime } from 'luxon';

export interface MonthNavigatorProps {
  currentMonth: DateTime;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}