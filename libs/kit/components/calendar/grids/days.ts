import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { XMapPipe } from '@mixin-ui/cdk';
import { X_I18N } from '@mixin-ui/kit/providers';
import { X_SLOT, XSlotsPipe } from '@mixin-ui/kit/directives';
import type { XCalendarOptions, XStartOfWeek, XWeekdayFormat } from '../options';

// @TODO: replace with internal utils
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-days',
  templateUrl: './days.html',
  imports: [XMapPipe, XSlotsPipe, NgTemplateOutlet],
})
export class XDays {
  readonly #i18n = inject(X_I18N);

  readonly slots = contentChildren(X_SLOT);
  readonly date = model.required<Date>();
  readonly startOfWeek = input<XStartOfWeek>(1);
  readonly format = input<XWeekdayFormat>('min');
  readonly disabledMapper = input<XCalendarOptions['disabled']>(() => false);
  readonly detailMapper = input<XCalendarOptions['detail']>();
  readonly value = input<Date | null>(null);
  readonly min = input<Date | null>(null);
  readonly max = input<Date | null>(null);

  readonly days = computed(() => {
    const date = this.date();
    const start = startOfWeek(startOfMonth(date), { weekStartsOn: this.startOfWeek() });
    const end = endOfWeek(endOfMonth(date), { weekStartsOn: this.startOfWeek() });

    return eachDayOfInterval({ start, end }).map(date => {
      return Object.defineProperty(date, 'toString', { value: () => String(date.getDate()) });
    });
  });

  readonly dayNames = computed(() => {
    const { dayNamesMin, dayNamesShort } = this.#i18n();
    return reorder(this.format() === 'min' ? dayNamesMin : dayNamesShort, this.startOfWeek());
  });

  readonly isActual = (date: Date) => isSameDay(date, Date.now());

  readonly isSelected = (date: Date, value: Date | null) => {
    return value ? isSameDay(date, value) : false;
  };

  readonly isOutOfRange = (date: Date, min: Date | null, max: Date | null) => {
    return (!!min && isBefore(date, min)) || (!!max && isAfter(date, max));
  };

  readonly isAdjacent = (date: Date, value: Date | null) => {
    return value ? !isSameMonth(date, value) : false;
  };

  readonly mapDetail = (date: Date, mapper?: XCalendarOptions['detail']) => {
    return mapper ? mapper(date) : null;
  };
}

// @TODO: replace to cdk
function reorder(tuple: readonly string[], startIndex: number): readonly string[] {
  const length = tuple.length;
  const index = ((startIndex % length) + length) % length;
  return [...tuple.slice(index), ...tuple.slice(0, index)];
}
