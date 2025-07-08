import { InjectionToken } from '@angular/core';
import { XUnion } from '@mixin-ui/kit/types';

export interface XCalendarOptions {
  readonly startOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  readonly size: XUnion<'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  readonly radius: XUnion<'none' | 'sm' | 'md' | 'lg' | 'full'>;
}

const defaultOptions: XCalendarOptions = {
  startOfWeek: 1,
  size: 'md',
  radius: 'md',
};

export const X_CALENDAR_OPTIONS = new InjectionToken<XCalendarOptions>('CALENDAR_OPTIONS', {
  factory: () => defaultOptions,
});
