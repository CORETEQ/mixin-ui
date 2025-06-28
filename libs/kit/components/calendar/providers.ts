import { ExistingProvider, InjectionToken, Signal, Type } from '@angular/core';

export interface XCalendarAccessor {
  readonly value: Signal<Date | null>;
  readonly min: Signal<Date | null>;
  readonly max: Signal<Date | null>;
  readonly multiple: Signal<boolean>;
  readonly select: (value: Date | null) => void;
}

export const X_CALENDAR_ACCESSOR = new InjectionToken<XCalendarAccessor>('CALENDAR_ACCESSOR');

export function provideCalendarAccessor(useExisting: Type<XCalendarAccessor>): ExistingProvider {
  return {
    provide: X_CALENDAR_ACCESSOR,
    useExisting,
  };
}
