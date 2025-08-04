import { ExistingProvider, InjectionToken, Signal, Type } from '@angular/core';

export interface XCalendarAccessor {
  readonly min: Signal<Date | null>;
  readonly max: Signal<Date | null>;
  readonly calendar: Signal<Date | null>;

  handleCalendarValue(value: Date): void;
}

export const X_CALENDAR_ACCESSOR = new InjectionToken<XCalendarAccessor>('CALENDAR_ACCESSOR');

export function provideCalendarAccessor(useExisting: Type<XCalendarAccessor>): ExistingProvider {
  return {
    provide: X_CALENDAR_ACCESSOR,
    useExisting,
  };
}
