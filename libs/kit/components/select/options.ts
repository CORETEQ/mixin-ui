import { FactoryProvider, inject, InjectionToken } from '@angular/core';
import { X_COMPARATOR, XComparator } from '@mixin-ui/kit/providers';

export interface XSelectOptions {
  readonly comparator: XComparator;
}

const defaultOptionsFactory = () => ({
  comparator: inject(X_COMPARATOR),
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
