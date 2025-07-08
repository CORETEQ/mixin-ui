import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  inject,
  input,
  linkedSignal,
  model,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  addMonths,
  addYears,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
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
import { createCva, XMapPipe } from '@mixin-ui/cdk';
import { X_LANGUAGE } from '@mixin-ui/kit/providers';
import { X_SLOT, XSlotsPipe } from '@mixin-ui/kit/directives';
import { provideButtonOptions, XButton } from '@mixin-ui/kit/components/button';
import { XGroup } from '@mixin-ui/kit/components/group';
import { XIcon } from '@mixin-ui/kit/components/icon';
import { X_CALENDAR_ACCESSOR } from './providers';
import { X_CALENDAR_OPTIONS } from './options';

export type CalendarSelectionMode = 'days' | 'months' | 'years';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-calendar',
  styleUrl: './calendar.scss',
  templateUrl: './calendar.html',
  imports: [XButton, XMapPipe, XSlotsPipe, XIcon, NgTemplateOutlet, XGroup],
  providers: [provideButtonOptions({ variant: 'subtle', color: 'gray', size: 'sm' })],
  host: {
    '[class]': '`x-calendar x-size-${this.size()} x-radius-${this.radius()}`',
  },
})
export class XCalendar {
  readonly #opt = inject(X_CALENDAR_OPTIONS);
  readonly #cva = createCva<Date | null>({ defaultValue: null, transform: value => value });
  readonly #accessor = inject(X_CALENDAR_ACCESSOR, { optional: true });
  readonly #lang = inject(X_LANGUAGE);

  readonly slots = contentChildren(X_SLOT);
  readonly mode = model<CalendarSelectionMode>('days');
  readonly startOfWeek = input(this.#opt.startOfWeek);
  readonly size = input(this.#opt.size);
  readonly radius = input(this.#opt.radius);

  readonly month = linkedSignal(() => this.value() || new Date());
  readonly value = computed(() => this.#accessor?.value() || this.#cva.value());
  readonly min = this.#accessor?.min || signal(null);
  readonly max = this.#accessor?.max || signal(null);

  protected readonly isToday = isToday;
  protected readonly daySelected = daySelected;
  protected readonly dayDisabled = dayDisabled;
  protected readonly dayAdjacent = dayAdjacent;
  protected readonly monthSelected = monthSelected;
  protected readonly monthDisabled = monthDisabled;
  protected readonly yearSelected = yearSelected;
  protected readonly yearDisabled = yearDisabled;

  readonly dayNames = computed(() => reorder(this.#lang()['dayNamesMin'], this.startOfWeek()));
  readonly monthNames = computed(() => this.#lang()['monthNames']);
  readonly monthName = computed(() => this.monthNames()[this.month().getMonth()]);
  readonly year = computed(() => this.month().getFullYear());

  readonly daysInMonth = computed(() => {
    const month = this.month();
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: this.startOfWeek() });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: this.startOfWeek() });

    return eachDayOfInterval({ start, end }).map(date => {
      date.toString = () => String(date.getDate());
      return date;
    });
  });

  readonly monthsInYear = computed(() => {
    const year = this.year();
    const start = startOfYear(new Date(year, 0, 1));
    const end = endOfYear(start);
    const names = this.monthNames();

    return eachMonthOfInterval({ start, end }).map(date => {
      date.toString = () => names[date.getMonth()];
      return date;
    });
  });

  readonly yearsInDecade = computed(() => {
    const year = this.year();
    const decade = Math.floor(year / 10) * 10;
    const start = new Date(decade, 0, 1);
    const end = new Date(decade + 9, 11, 31);

    return eachYearOfInterval({ start, end }).map(date => {
      date.toString = () => String(date.getFullYear());
      return date;
    });
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

  selectDay(day: Date): void {
    if (this.dayDisabled(day, this.min(), this.max())) {
      return;
    }

    this.updateValue(day);
  }

  selectMonth(month: Date): void {
    if (this.monthDisabled(month, this.min(), this.max())) {
      return;
    }

    this.month.set(month);
    this.mode.set('days');
    this.updateValue(month);
  }

  selectYear(year: Date): void {
    if (this.yearDisabled(year, this.min(), this.max())) {
      return;
    }

    this.month.set(year);
    this.mode.set('months');
    this.updateValue(year);
  }

  private updateValue(date: Date | null): void {
    this.#accessor?.handleDate(date);
    this.#cva.updateValue(date);
  }
}

function isToday(date: Date): boolean {
  return isSameDay(date, Date.now());
}

function daySelected(date: Date, value: Date | null): boolean {
  return value ? isSameDay(date, value) : false;
}

function monthSelected(date: Date, value: Date | null): boolean {
  return value ? isSameMonth(date, value) : false;
}

function yearSelected(date: Date, value: Date | null): boolean {
  return value ? isSameYear(date, value) : false;
}

function dayAdjacent(date: Date, value: Date | null): boolean {
  return value ? !isSameMonth(date, value) : false;
}

function dayDisabled(date: Date, min: Date | null, max: Date | null): boolean {
  return (!!min && isBefore(date, min)) || (!!max && isAfter(date, max));
}

function monthDisabled(date: Date, min: Date | null, max: Date | null): boolean {
  return (
    (!!min && isBefore(endOfMonth(date), startOfMonth(min))) ||
    (!!max && isAfter(startOfMonth(date), endOfMonth(max)))
  );
}

function yearDisabled(date: Date, min: Date | null, max: Date | null): boolean {
  return (
    (!!min && isBefore(endOfYear(date), startOfYear(min))) ||
    (!!max && isAfter(startOfYear(date), endOfYear(max)))
  );
}

function reorder(tuple: readonly string[], startIndex: number): readonly string[] {
  const length = tuple.length;
  const index = ((startIndex % length) + length) % length;
  return [...tuple.slice(index), ...tuple.slice(0, index)];
}
