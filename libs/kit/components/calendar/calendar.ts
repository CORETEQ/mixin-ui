import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  inject,
  input,
  linkedSignal,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { fromEvent } from 'rxjs';
import { createCva, observe } from '@mixin-ui/cdk';
import { X_SLOT, XPopoverTarget, XSlot, XSlotsPipe } from '@mixin-ui/kit/directives';
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
  providers: [provideButtonOptions({ variant: 'subtle', color: 'neutral', size: 'sm' })],
  host: {
    '[class]': '`x-calendar x-size-${size()} x-radius-${radius()}`',
  },
})
export class XCalendar {
  readonly #opt = inject(X_CALENDAR_OPTIONS);
  readonly #cva = createCva<Date | null>({ defaultValue: null, transform: value => value });
  readonly #el = inject(ElementRef).nativeElement;
  readonly #accessor = inject(X_CALENDAR_ACCESSOR, { optional: true });
  readonly #popover = inject(XPopoverTarget, { optional: true });

  readonly slots = contentChildren(X_SLOT);
  readonly month = model<Date>();
  readonly mode = model(this.#opt.mode);
  readonly _min = input(this.#opt.min, { alias: 'min' });
  readonly _max = input(this.#opt.max, { alias: 'max' });
  readonly startOfWeek = input(this.#opt.startOfWeek);
  readonly weekdayFormat = input(this.#opt.weekdayFormat);
  readonly monthFormat = input(this.#opt.monthFormat);
  readonly disabled = input(this.#opt.disabled);
  readonly detail = input(this.#opt.detail);
  readonly size = input(this.#opt.size);
  readonly radius = input(this.#opt.radius);
  readonly min = computed(() => this.#accessor?.min() || this._min());
  readonly max = computed(() => this.#accessor?.max() || this._max());

  protected readonly value = linkedSignal(() => this.#accessor?.calendar() || this.#cva.value());

  protected readonly visibleMonth = linkedSignal(() => {
    const valueMonth = this.value();
    const explicitMonth = this.month();

    if (valueMonth) {
      return valueMonth;
    }

    if (explicitMonth) {
      return explicitMonth;
    }

    const min = this.min();
    const max = this.max();
    const now = Date.now();

    if (min || max) {
      if (min && now < min.getTime()) {
        return min;
      }

      if (max && now > max.getTime()) {
        return max;
      }
    }

    return new Date();
  });

  constructor() {
    if (!this.#popover?.autoFocus()) {
      observe(fromEvent<PointerEvent>(this.#el, 'pointerdown'), e => {
        e.preventDefault();
      });
    }
  }

  updateVisibleMonth(month: Date): void {
    this.month.set(month);
    this.visibleMonth.set(month);
  }

  updateMode(mode: XCalendarMode): void {
    this.mode.update(curr => (curr === mode ? 'days' : mode));
  }

  updateDay(day: Date): void {
    this.#popover?.toggle(false);
    this.#popover?.focus();
    this.updateValue(day);
  }

  updateMonth(month: Date): void {
    this.month.set(month);
    this.updateMode('days');
    this.updateValue(month, false);
  }

  updateYear(year: Date): void {
    this.month.set(year);
    this.updateMode('months');
    this.updateValue(year, false);
  }

  private updateValue(date: Date, dispatch = true): void {
    this.value.set(date);

    if (dispatch) {
      this.#accessor?.handleCalendarValue(date);
      this.#cva.updateValue(date);
    }
  }
}
