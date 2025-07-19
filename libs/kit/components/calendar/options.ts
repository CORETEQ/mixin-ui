import { InjectionToken, ValueProvider } from '@angular/core';
import { XUnion } from '@mixin-ui/kit/types';

type Mapper<I, O> = (input: I) => O;

export type XStartOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type XWeekdayFormat = 'min' | 'short';
export type XMonthFormat = 'short' | 'long';
export type XCalendarMode = 'days' | 'months' | 'years';

export interface XCalendarOptions {
  readonly mode: XCalendarMode;
  readonly startOfWeek: XStartOfWeek;
  readonly size: XUnion<'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  readonly radius: XUnion<'none' | 'sm' | 'md' | 'lg' | 'full'>;
  readonly weekdayFormat: XWeekdayFormat;
  readonly monthFormat: XMonthFormat;
  readonly detail?: Mapper<Date, any>;
  readonly disabled?: Mapper<Date, boolean>;
}

const defaultOptions: XCalendarOptions = {
  mode: 'days',
  startOfWeek: 1,
  size: 'md',
  radius: 'md',
  weekdayFormat: 'min',
  monthFormat: 'short',
};

export const X_CALENDAR_OPTIONS = new InjectionToken<XCalendarOptions>('CALENDAR_OPTIONS', {
  factory: () => defaultOptions,
});

export function provideCalendarOptions(options: Partial<XCalendarOptions>): ValueProvider {
  return {
    provide: X_CALENDAR_OPTIONS,
    useValue: { ...defaultOptions, ...options },
  };
}
