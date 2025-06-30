import { InjectionToken } from '@angular/core';

export interface XCalendarOptions {
  readonly startOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const defaultOptions: XCalendarOptions = {
  startOfWeek: 1,
};

export const X_CALENDAR_OPTIONS = new InjectionToken<XCalendarOptions>('CALENDAR_OPTIONS', {
  factory: () => defaultOptions,
});
