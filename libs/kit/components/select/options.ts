import { inject, InjectionToken } from '@angular/core';
import { X_COMPARATOR, XComparator } from '@mixin-ui/kit/providers';

export interface XSelectOptions {
  readonly compareFn?: XComparator;
}

const defaultOptionsFactory = () => ({
  compareFn: inject(X_COMPARATOR),
});

export const X_SELECT_OPTIONS = new InjectionToken<XSelectOptions>('SELECT_OPTIONS', {
  factory: defaultOptionsFactory,
});

export function provideSelectOptions(options: Partial<XSelectOptions>): XSelectOptions {
  return { ...defaultOptionsFactory(), ...options };
}
