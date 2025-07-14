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
import { createCva } from '@mixin-ui/cdk';
import { X_SLOT, XPopover, XSlot, XSlotsPipe } from '@mixin-ui/kit/directives';
import { provideButtonOptions } from '@mixin-ui/kit/components/button';
import { XDays } from './grids/days';
import { XMonths } from './grids/months';
import { XYears } from './grids/years';
import { X_CALENDAR_ACCESSOR } from './providers';
import { X_CALENDAR_OPTIONS, XCalendarMode } from './options';
import { XCalendarNav } from './nav';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-calendar',
  styleUrl: './calendar.scss',
  templateUrl: './calendar.html',
  imports: [NgTemplateOutlet, XDays, XYears, XMonths, XSlotsPipe, XSlot, XCalendarNav],
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

  readonly slots = contentChildren(X_SLOT);
  readonly mode = model(this.#opt.mode);
  readonly startOfWeek = input(this.#opt.startOfWeek);
  readonly weekdayFormat = input(this.#opt.weekdayFormat);
  readonly monthFormat = input(this.#opt.monthFormat);
  readonly disabled = input(this.#opt.disabled);
  readonly detail = input(this.#opt.detail);
  readonly size = input(this.#opt.size);
  readonly radius = input(this.#opt.radius);

  readonly month = linkedSignal(() => this.value() || new Date());
  readonly value = computed(() => this.#accessor?.value() || this.#cva.value());
  readonly min = this.#accessor?.min || signal(null);
  readonly max = this.#accessor?.max || signal(null);

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
