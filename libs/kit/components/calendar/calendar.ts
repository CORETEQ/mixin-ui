import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import {
  addMonths,
  addYears,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isSameYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMonths,
  subYears,
} from 'date-fns';
import { provideButtonOptions, XButton } from '@mixin-ui/kit/components/button';
import { X_CALENDAR_ACCESSOR } from './providers';
import { XMapPipe } from '@mixin-ui/cdk';

export type CalendarSelectionMode = 'days' | 'months' | 'years';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-calendar',
  styleUrl: './calendar.scss',
  templateUrl: './calendar.html',
  imports: [XButton, XMapPipe],
  providers: [provideButtonOptions({ variant: 'subtle', color: 'gray' })],
  host: {
    class: 'x-calendar',
  },
})
export class XCalendar {
  readonly #accessor = inject(X_CALENDAR_ACCESSOR, { optional: true });

  protected readonly format = format;

  readonly month = input<Date>(new Date());
  readonly selectionMode = input<CalendarSelectionMode>('days');
  readonly min = input<Date | null>(null);
  readonly max = input<Date | null>(null);
  readonly multiple = input<boolean>(false);
  readonly monthChange = output<Date>();
  readonly selectionModeChange = output<CalendarSelectionMode>();
  readonly value = model<Date | Date[] | null>(null);

  readonly headerTitle = computed(() => {
    const currentMonth = this.month();
    const mode = this.selectionMode();

    switch (mode) {
      case 'days':
        return this.format(currentMonth, 'MMMM yyyy');
      case 'months':
        return this.format(currentMonth, 'yyyy');
      case 'years': {
        const year = currentMonth.getFullYear();
        const decade = Math.floor(year / 10) * 10;
        return `${decade} - ${decade + 9}`;
      }
      default:
        return '';
    }
  });

  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  readonly daysInMonth = computed(() => {
    const currentMonth = this.month();
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));

    return eachDayOfInterval({ start, end }).map(date => ({
      date,
      disabled: this.isDateDisabled(date),
    }));
  });

  readonly monthsInYear = computed(() => {
    const currentYear = this.month().getFullYear();
    const start = startOfYear(new Date(currentYear, 0, 1));
    const end = endOfYear(start);

    return eachMonthOfInterval({ start, end }).map(date => ({
      date,
      disabled: this.isMonthDisabled(date),
    }));
  });

  readonly yearsInDecade = computed(() => {
    const currentYear = this.month().getFullYear();
    const decade = Math.floor(currentYear / 10) * 10;
    const start = new Date(decade, 0, 1);
    const end = new Date(decade + 9, 11, 31);

    return eachYearOfInterval({ start, end }).map(date => ({
      date,
      disabled: this.isYearDisabled(date),
    }));
  });

  navigatePrevious(): void {
    const currentMonth = this.month();
    const mode = this.selectionMode();

    let newMonth: Date;

    switch (mode) {
      case 'days':
        newMonth = subMonths(currentMonth, 1);
        break;
      case 'months':
        newMonth = subYears(currentMonth, 1);
        break;
      case 'years':
        newMonth = subYears(currentMonth, 10);
        break;
      default:
        return;
    }

    this.monthChange.emit(newMonth);
  }

  navigateNext(): void {
    const currentMonth = this.month();
    const mode = this.selectionMode();

    let newMonth: Date;

    switch (mode) {
      case 'days':
        newMonth = addMonths(currentMonth, 1);
        break;
      case 'months':
        newMonth = addYears(currentMonth, 1);
        break;
      case 'years':
        newMonth = addYears(currentMonth, 10);
        break;
      default:
        return;
    }

    this.monthChange.emit(newMonth);
  }

  toggleSelectionMode(): void {
    const currentMode = this.selectionMode();
    let newMode: CalendarSelectionMode;

    switch (currentMode) {
      case 'days':
        newMode = 'months';
        break;
      case 'months':
        newMode = 'years';
        break;
      case 'years':
        newMode = 'days';
        break;
      default:
        newMode = 'days';
    }
    this.selectionModeChange.emit(newMode);
  }

  selectDate(date: Date): void {
    if (this.isDateDisabled(date)) {
      return;
    }

    this.updateValue(date);
  }

  selectMonth(date: Date): void {
    if (this.isMonthDisabled(date)) {
      return;
    }

    this.updateValue(date);
    this.monthChange.emit(date);
    this.selectionModeChange.emit('days');
  }

  selectYear(date: Date): void {
    if (this.isYearDisabled(date)) {
      return;
    }

    this.updateValue(date);
    this.monthChange.emit(date);
    this.selectionModeChange.emit('months');
  }

  private updateValue(date: Date): void {
    const currentValue = this.value();
    const isMultiple = this.multiple();

    if (!isMultiple) {
      this.value.set(date);
      return;
    }

    if (!currentValue || !Array.isArray(currentValue)) {
      this.value.set([date]);
      return;
    }

    const existingIndex = currentValue.findIndex(d => isSameDay(d, date));
    if (existingIndex >= 0) {
      // Remove if already selected
      const newValue = currentValue.filter((_, index) => index !== existingIndex);
      this.value.set(newValue.length > 0 ? newValue : null);
    } else {
      // Add to selection
      this.value.set([...currentValue, date]);
    }
  }

  isDateSelected(date: Date): boolean {
    const currentValue = this.value();

    if (!currentValue) {
      return false;
    }

    if (Array.isArray(currentValue)) {
      return currentValue.some(d => isSameDay(d, date));
    }

    return isSameDay(currentValue, date);
  }

  isMonthSelected(date: Date): boolean {
    const currentValue = this.value();

    if (!currentValue) {
      return false;
    }

    if (Array.isArray(currentValue)) {
      return currentValue.some(d => isSameMonth(d, date));
    }

    return isSameMonth(currentValue, date);
  }

  isYearSelected(date: Date): boolean {
    const currentValue = this.value();

    if (!currentValue) {
      return false;
    }

    if (Array.isArray(currentValue)) {
      return currentValue.some(d => isSameYear(d, date));
    }

    return isSameYear(currentValue, date);
  }

  private isDateDisabled(date: Date): boolean {
    const minDate = this.min();
    const maxDate = this.max();

    if (minDate && isBefore(date, minDate)) {
      return true;
    }

    if (maxDate && isAfter(date, maxDate)) {
      return true;
    }

    return false;
  }

  private isMonthDisabled(date: Date): boolean {
    const minDate = this.min();
    const maxDate = this.max();

    if (minDate && isBefore(endOfMonth(date), startOfMonth(minDate))) {
      return true;
    }

    if (maxDate && isAfter(startOfMonth(date), endOfMonth(maxDate))) {
      return true;
    }

    return false;
  }

  private isYearDisabled(date: Date): boolean {
    const minDate = this.min();
    const maxDate = this.max();

    if (minDate && isBefore(endOfYear(date), startOfYear(minDate))) {
      return true;
    }

    if (maxDate && isAfter(startOfYear(date), endOfYear(maxDate))) {
      return true;
    }

    return false;
  }
}
