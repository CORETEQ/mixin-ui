import { FactoryProvider, inject, InjectionToken } from '@angular/core';
import { X_COMPARATOR, XComparator } from '@mixin-ui/kit/providers';

export interface XSelectOptions<T = any> {
  readonly comparator: XComparator;
  readonly stringify: (value: T | string | null) => string;
}

const defaultOptionsFactory = (): XSelectOptions => ({
  comparator: inject(X_COMPARATOR),
  stringify: value => (Array.isArray(value) ? value.join(', ') : value ?? ''),
});

export const X_SELECT_OPTIONS = new InjectionToken<XSelectOptions>('SELECT_OPTIONS', {
  factory: defaultOptionsFactory,
});

export function provideSelectOptions(options: Partial<XSelectOptions>): FactoryProvider {
  return {
    provide: X_SELECT_OPTIONS,
    useFactory: () => ({ ...defaultOptionsFactory(), ...options }),
  };
}
