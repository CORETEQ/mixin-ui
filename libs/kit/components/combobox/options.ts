import { FactoryProvider, inject, InjectionToken } from '@angular/core';
import { X_COMPARATOR, XComparator } from '@mixin-ui/kit/providers';

export interface XComboboxOptions<T = any> {
  readonly compareFn: XComparator;
  readonly stringifyFn: (value: T | string | null) => string;
  readonly strict: boolean;
}

const defaultOptionsFactory = (): XComboboxOptions => ({
  compareFn: inject(X_COMPARATOR),
  strict: true,
  stringifyFn: value => (value ? String(value) : ''),
});

export const X_COMBOBOX_OPTIONS = new InjectionToken<XComboboxOptions>('COMBOBOX_OPTIONS', {
  factory: defaultOptionsFactory,
});

export function provideComboboxOptions(options: Partial<XComboboxOptions>): FactoryProvider {
  return {
    provide: X_COMBOBOX_OPTIONS,
    useFactory: () => ({ ...defaultOptionsFactory(), ...options }),
  };
}
