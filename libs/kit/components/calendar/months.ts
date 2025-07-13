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
import { XMonthFormat } from './options';

// @TODO: replace with internal utils
import {
  eachMonthOfInterval,
  endOfMonth,
  endOfYear,
  isAfter,
  isBefore,
  isSameMonth,
  startOfMonth,
  startOfYear,
} from 'date-fns';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-months',
  templateUrl: './months.html',
  imports: [XMapPipe, NgTemplateOutlet, XSlotsPipe],
  host: {
    class: 'x-calendar-months',
  },
})
export class XMonths {
  readonly #i18n = inject(X_I18N);

  readonly slots = contentChildren(X_SLOT);
  readonly date = model.required<Date>();
  readonly format = input<XMonthFormat>('short');
  readonly value = input<Date | null>(null);
  readonly min = input<Date | null>(null);
  readonly max = input<Date | null>(null);

  readonly names = computed(() =>
    this.format() === 'short' ? this.#i18n().monthNamesShort : this.#i18n().monthNames
  );

  readonly months = computed(() => {
    const names = this.names();
    const year = this.date().getFullYear();
    const start = startOfYear(new Date(year, 0, 1));
    const end = endOfYear(start);

    return eachMonthOfInterval({ start, end }).map(date => {
      return Object.defineProperty(date, 'toString', { value: () => names[date.getMonth()] });
    });
  });

  readonly isActual = (date: Date) => isSameMonth(date, Date.now());

  readonly isSelected = (date: Date, value: Date | null) => {
    return value ? isSameMonth(date, value) : false;
  };

  readonly isDisabled = (date: Date, min: Date | null, max: Date | null) => {
    return (
      (!!min && isBefore(endOfMonth(date), startOfMonth(min))) ||
      (!!max && isAfter(startOfMonth(date), endOfMonth(max)))
    );
  };
}
