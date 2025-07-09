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
import { createCva } from '@mixin-ui/cdk';
import { X_I18N } from '@mixin-ui/kit/providers';
import { X_SLOT, XPopover } from '@mixin-ui/kit/directives';
import { provideButtonOptions, XButton } from '@mixin-ui/kit/components/button';
import { XGroup } from '@mixin-ui/kit/components/group';
import { XIcon } from '@mixin-ui/kit/components/icon';
import { X_CALENDAR_ACCESSOR } from './providers';
import { X_CALENDAR_OPTIONS, XCalendarMode } from './options';
import { XDays } from './days';
import { XMonths } from './months';
import { XYears } from './years';

import { addMonths, addYears, subMonths, subYears } from 'date-fns';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-calendar',
  styleUrl: './calendar.scss',
  templateUrl: './calendar.html',
  imports: [XButton, XIcon, XGroup, XDays, XYears, XMonths],
  providers: [provideButtonOptions({ variant: 'subtle', color: 'gray', size: 'sm' })],
  host: {
    '[class]': '`x-calendar x-size-${size()} x-radius-${radius()}`',
  },
})
export class XCalendar {
  readonly #opt = inject(X_CALENDAR_OPTIONS);
  readonly #cva = createCva<Date | null>({ defaultValue: null, transform: value => value });
  readonly #accessor = inject(X_CALENDAR_ACCESSOR, { optional: true });
  readonly #popover = inject(XPopover, { optional: true });

  readonly #i18n = inject(X_I18N);

  readonly slots = contentChildren(X_SLOT);
  readonly mode = model(this.#opt.mode);
  readonly startOfWeek = input(this.#opt.startOfWeek);
  readonly weekdayFormat = input(this.#opt.weekdayFormat);
  readonly monthFormat = input(this.#opt.monthFormat);
  readonly size = input(this.#opt.size);
  readonly radius = input(this.#opt.radius);

  readonly month = linkedSignal(() => this.value() || new Date());
  readonly value = computed(() => this.#accessor?.value() || this.#cva.value());
  readonly min = this.#accessor?.min || signal(null);
  readonly max = this.#accessor?.max || signal(null);

  readonly monthName = computed(() => {
    const { monthNamesShort, monthNames } = this.#i18n();
    const format = this.monthFormat();
    const index = this.month().getMonth();
    return (format === 'short' ? monthNamesShort : monthNames)[index];
  });

  readonly year = computed(() => this.month().getFullYear());

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
