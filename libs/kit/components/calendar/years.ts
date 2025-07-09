import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { XMapPipe } from '@mixin-ui/cdk';

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
  imports: [XMapPipe],
  host: {
    class: 'x-calendar-years',
  },
})
export class XYears {
  readonly year = model.required<Date>();
  readonly value = input<Date | null>(null);
  readonly min = input<Date | null>(null);
  readonly max = input<Date | null>(null);

  readonly years = computed(() => {
    const startYear = this.year().getFullYear();
    const start = new Date(startYear, 0, 1);
    const end = new Date(startYear + 23, 11, 31);
    return eachYearOfInterval({ start, end });
  });

  readonly isCurrent = (date: Date) => isSameYear(date, Date.now());

  readonly isSelected = (date: Date, value: Date | null) => {
    return value ? isSameYear(date, value) : false;
  };

  readonly isDisabled = (date: Date, min: Date | null, max: Date | null) => {
    return (
      (!!min && isBefore(endOfYear(date), startOfYear(min))) ||
      (!!max && isAfter(startOfYear(date), endOfYear(max)))
    );
  };

  handleClick(year: Date): void {
    if (this.isDisabled(year, this.min(), this.max())) {
      return;
    }

    this.year.set(year);
  }
}
