import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { XMapPipe } from '@mixin-ui/cdk';
import { X_SLOT, XSlotsPipe } from '@mixin-ui/kit/directives';

// @TODO: replace with internal utils
import {
  eachYearOfInterval,
  endOfYear,
  isAfter,
  isBefore,
  isSameYear,
  startOfYear,
} from 'date-fns';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-years',
  templateUrl: './years.html',
  imports: [XMapPipe, NgTemplateOutlet, XSlotsPipe],
  host: {
    class: 'x-calendar-years',
  },
})
export class XYears {
  readonly slots = contentChildren(X_SLOT);
  readonly date = model.required<Date>();
  readonly value = input<Date | null>(null);
  readonly min = input<Date | null>(null);
  readonly max = input<Date | null>(null);

  readonly years = computed(() => {
    const startYear = this.date().getFullYear();
    const start = new Date(startYear, 0, 1);
    const end = new Date(startYear + 23, 11, 31);

    return eachYearOfInterval({ start, end }).map(date => {
      return Object.defineProperty(date, 'toString', { value: () => String(date.getFullYear()) });
    });
  });

  readonly isActual = (date: Date) => isSameYear(date, Date.now());

  readonly isSelected = (date: Date, value: Date | null) => {
    return value ? isSameYear(date, value) : false;
  };

  readonly isDisabled = (date: Date, min: Date | null, max: Date | null) => {
    return (
      (!!min && isBefore(endOfYear(date), startOfYear(min))) ||
      (!!max && isAfter(startOfYear(date), endOfYear(max)))
    );
  };
}
