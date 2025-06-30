import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  model,
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
import { XMapPipe } from '@mixin-ui/cdk';
import { provideButtonOptions, XButton } from '@mixin-ui/kit/components/button';
import { XIcon } from '@mixin-ui/kit/components/icon';
import { X_CALENDAR_ACCESSOR } from './providers';

export type CalendarSelectionMode = 'days' | 'months' | 'years';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-calendar',
  styleUrl: './calendar.scss',
  templateUrl: './calendar.html',
  imports: [XButton, XMapPipe, XIcon],
  providers: [provideButtonOptions({ variant: 'ghost', color: 'gray', size: 'md' })],
  host: {
    class: 'x-calendar',
  },
})
export class XCalendar {
  readonly #accessor = inject(X_CALENDAR_ACCESSOR);

  readonly month = linkedSignal(() => this.value() || new Date());
  readonly mode = model<CalendarSelectionMode>('days');
  readonly value = this.#accessor.value;
  readonly min = this.#accessor.min;
  readonly max = this.#accessor.max;

  protected readonly format = format;

  protected readonly isDateSelected = (date: Date) => {
    return this.value() ? isSameDay(this.value()!, date) : false;
  };

  readonly headerTitle = computed(() => {
    const currentMonth = this.month();
    const mode = this.mode();

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
    const mode = this.mode();

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

    this.month.set(newMonth);
  }

  navigateNext(): void {
    const currentMonth = this.month();
    const mode = this.mode();

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

    this.month.set(newMonth);
  }

  toggleSelectionMode(): void {
    const currentMode = this.mode();
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
    this.mode.set(newMode);
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
    this.month.set(date);
    this.mode.set('days');
  }

  selectYear(date: Date): void {
    if (this.isYearDisabled(date)) {
      return;
    }

    this.updateValue(date);
    this.month.set(date);
    this.mode.set('months');
  }

  private updateValue(date: Date | null): void {
    this.#accessor?.selectDate(date);
  }

  isMonthSelected(date: Date): boolean {
    const currentValue = this.value();

    if (!currentValue) {
      return false;
    }

    return isSameMonth(currentValue, date);
  }

  isYearSelected(date: Date): boolean {
    const currentValue = this.value();

    if (!currentValue) {
      return false;
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
