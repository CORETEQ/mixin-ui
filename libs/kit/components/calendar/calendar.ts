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
  endOfMonth,
  endOfWeek,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
  subYears,
} from 'date-fns';
import { createCva, XMapPipe } from '@mixin-ui/cdk';
import { X_I18N } from '@mixin-ui/kit/providers';
import { X_SLOT, XPopover, XSlotsPipe } from '@mixin-ui/kit/directives';
import { provideButtonOptions, XButton } from '@mixin-ui/kit/components/button';
import { XGroup } from '@mixin-ui/kit/components/group';
import { XIcon } from '@mixin-ui/kit/components/icon';
import { X_CALENDAR_ACCESSOR } from './providers';
import { X_CALENDAR_OPTIONS } from './options';
import { XMonths } from './months';
import { XYears } from './years';

export type XCalendarMode = 'days' | 'months' | 'years';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-calendar',
  styleUrl: './calendar.scss',
  templateUrl: './calendar.html',
  imports: [XButton, XMapPipe, XSlotsPipe, XIcon, NgTemplateOutlet, XGroup, XYears, XMonths],
  providers: [provideButtonOptions({ variant: 'subtle', color: 'gray', size: 'sm' })],
  host: {
    '[class]': '`x-calendar x-size-${this.size()} x-radius-${this.radius()}`',
  },
})
export class XCalendar {
  readonly #opt = inject(X_CALENDAR_OPTIONS);
  readonly #cva = createCva<Date | null>({ defaultValue: null, transform: value => value });
  readonly #accessor = inject(X_CALENDAR_ACCESSOR, { optional: true });
  readonly #popover = inject(XPopover, { optional: true });

  readonly #i18n = inject(X_I18N);

  readonly slots = contentChildren(X_SLOT);
  readonly mode = model<XCalendarMode>('days');
  readonly startOfWeek = input(this.#opt.startOfWeek);
  readonly size = input(this.#opt.size);
  readonly radius = input(this.#opt.radius);
  readonly weekdayFormat = input(this.#opt.weekdayFormat);
  readonly monthFormat = input(this.#opt.monthFormat);

  readonly month = linkedSignal(() => this.value() || new Date());
  readonly value = computed(() => this.#accessor?.value() || this.#cva.value());
  readonly min = this.#accessor?.min || signal(null);
  readonly max = this.#accessor?.max || signal(null);
  readonly dayNames = computed(() => reorder(this.#i18n().dayNamesMin, this.startOfWeek()));
  readonly monthNames = computed(() => this.#i18n().monthNamesShort);
  readonly monthName = computed(() => this.monthNames()[this.month().getMonth()]);
  readonly year = computed(() => this.month().getFullYear());

  readonly days = computed(() => {
    const month = this.month();
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: this.startOfWeek() });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: this.startOfWeek() });

    return eachDayOfInterval({ start, end }).map(date => {
      date.toString = () => String(date.getDate());
      return date;
    });
  });

  readonly isCurrentDay = isCurrentDay;
  readonly daySelected = daySelected;
  readonly dayDisabled = dayDisabled;
  readonly dayAdjacent = dayAdjacent;

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
        newMonth = subYears(currentMonth, 24);
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
        newMonth = addYears(currentMonth, 24);
        break;
      default:
        return;
    }

    this.month.set(newMonth);
  }

  setMode(mode: XCalendarMode): void {
    this.mode.update(curr => (curr === mode ? 'days' : mode));
  }

  setDay(day: Date): void {
    if (this.dayDisabled(day, this.min(), this.max())) {
      return;
    }

    this.#popover?.toggle(false);
    this.#popover?.focusOrigin();
    this.updateValue(day);
  }

  setMonth(month: Date): void {
    this.month.set(month);
    this.setMode('days');
    this.updateValue(month);
  }

  setYear(year: Date): void {
    this.month.set(year);
    this.setMode('months');
    this.updateValue(year);
  }

  private updateValue(date: Date | null): void {
    this.#accessor?.handleDate(date);
    this.#cva.updateValue(date);
  }
}

function isCurrentDay(date: Date): boolean {
  return isSameDay(date, Date.now());
}

function daySelected(date: Date, value: Date | null): boolean {
  return value ? isSameDay(date, value) : false;
}

function dayAdjacent(date: Date, value: Date | null): boolean {
  return value ? !isSameMonth(date, value) : false;
}

function dayDisabled(date: Date, min: Date | null, max: Date | null): boolean {
  return (!!min && isBefore(date, min)) || (!!max && isAfter(date, max));
}

function reorder(tuple: readonly string[], startIndex: number): readonly string[] {
  const length = tuple.length;
  const index = ((startIndex % length) + length) % length;
  return [...tuple.slice(index), ...tuple.slice(0, index)];
}
