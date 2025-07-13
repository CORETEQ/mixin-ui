import { inject, InjectionToken } from '@angular/core';
import { X_COMPARATOR, XComparator } from '@mixin-ui/kit/providers';

export interface XComboboxOptions {
  readonly compareFn?: XComparator;
}

const defaultOptionsFactory = () => ({
  compareFn: inject(X_COMPARATOR),
});

export const X_COMBOBOX_OPTIONS = new InjectionToken<XComboboxOptions>('COMBOBOX_OPTIONS', {
  factory: defaultOptionsFactory,
});

export function provideComboboxOptions(options: Partial<XComboboxOptions>): XComboboxOptions {
  return { ...defaultOptionsFactory(), ...options };
}
