import { FactoryProvider, inject, InjectionToken } from '@angular/core';
import { X_COMPARATOR, XComparator } from '@mixin-ui/kit/providers';

export interface XComboboxOptions<T = any> {
  readonly comparator: XComparator;
  readonly stringify: (value: T | string | null) => string;
  readonly matcher: (value: string, option: string) => boolean;
  readonly strict: boolean;
}

const defaultOptionsFactory = (): XComboboxOptions => ({
  comparator: inject(X_COMPARATOR),
  stringify: value => (value ? String(value) : ''),
  matcher: (value, option) => value.toLowerCase() === option.toLowerCase(),
  strict: true,
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
