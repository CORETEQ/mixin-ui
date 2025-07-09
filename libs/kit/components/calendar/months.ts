import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { XMapPipe } from '@mixin-ui/cdk';
import { X_I18N } from '@mixin-ui/kit/providers';
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
  imports: [XMapPipe],
  host: {
    class: 'x-calendar-months',
  },
})
export class XMonths {
  readonly #i18n = inject(X_I18N);

  readonly month = model.required<Date>();
  readonly format = input<XMonthFormat>('short');
  readonly value = input<Date | null>(null);
  readonly min = input<Date | null>(null);
  readonly max = input<Date | null>(null);

  readonly names = computed(() =>
    this.format() === 'short' ? this.#i18n().monthNamesShort : this.#i18n().monthNames
  );

  readonly months = computed(() => {
    const start = startOfYear(new Date(0, 0, 1));
    const end = endOfYear(start);
    return eachMonthOfInterval({ start, end });
  });

  readonly isCurrent = (date: Date) => isSameMonth(date, Date.now());

  readonly isSelected = (date: Date, value: Date | null) => {
    return value ? isSameMonth(date, value) : false;
  };

  readonly isDisabled = (date: Date, min: Date | null, max: Date | null) => {
    return (
      (!!min && isBefore(endOfMonth(date), startOfMonth(min))) ||
      (!!max && isAfter(startOfMonth(date), endOfMonth(max)))
    );
  };

  handleClick(month: Date): void {
    if (this.isDisabled(month, this.min(), this.max())) {
      return;
    }

    this.month.set(month);
  }
}
