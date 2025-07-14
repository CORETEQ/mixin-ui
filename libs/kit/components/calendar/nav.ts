import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { X_I18N } from '@mixin-ui/kit/providers';
import { XButton } from '@mixin-ui/kit/components/button';
import { XGroup } from '@mixin-ui/kit/components/group';
import { XIcon } from '@mixin-ui/kit/components/icon';
import { XCalendarMode, XCalendarOptions, XMonthFormat } from './options';

// @TODO: replace with internal utils
import { addMonths, addYears, subMonths, subYears } from 'date-fns';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-calendar-nav',
  templateUrl: './nav.html',
  imports: [XButton, XGroup, XIcon],
  host: {
    class: 'x-calendar-nav',
  },
})
export class XCalendarNav {
  readonly #i18n = inject(X_I18N);

  readonly mode = input<XCalendarMode>();
  readonly month = model.required<Date>();
  readonly monthFormat = input<XMonthFormat>();
  readonly radius = input<XCalendarOptions['radius']>('md');
  readonly monthsShown = computed(() => this.mode() === 'months');
  readonly yearsShown = computed(() => this.mode() === 'years');
  readonly modeChange = output<XCalendarMode>();

  readonly monthName = computed(() => {
    const { monthNamesShort, monthNames } = this.#i18n();
    const format = this.monthFormat();
    const index = this.month().getMonth();
    return (format === 'short' ? monthNamesShort : monthNames)[index];
  });

  readonly year = computed(() => this.month().getFullYear());

  back(): void {
    const month = this.month();
    const mode = this.mode();
    this.month.set(mode === 'days' ? subMonths(month, 1) : subYears(month, 24));
  }

  forth(): void {
    const month = this.month();
    const mode = this.mode();
    this.month.set(mode === 'days' ? addMonths(month, 1) : addYears(month, 24));
  }
}
