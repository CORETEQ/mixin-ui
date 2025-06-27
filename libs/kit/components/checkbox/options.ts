import { InjectionToken, ValueProvider } from '@angular/core';
import { XColor, XUnion } from '@mixin-ui/kit/types';

export interface XCheckboxOptions {
  readonly size: XUnion<'sm' | 'md' | 'lg'>;
  readonly radius: XUnion<'none' | 'sm' | 'md' | 'lg' | 'full'>;
  readonly iconOn: string;
  readonly iconIndeterminate: string;
  readonly color?: XColor;
}

const defaultOptions: XCheckboxOptions = {
  size: 'md',
  radius: 'sm',
  iconOn: 'check',
  iconIndeterminate: 'minus',
};

export const X_CHECKBOX_OPTIONS = new InjectionToken<XCheckboxOptions>('CHECKBOX_OPTIONS', {
  factory: () => defaultOptions,
});

export function provideCheckboxOptions(options: Partial<XCheckboxOptions>): ValueProvider {
  return {
    provide: X_CHECKBOX_OPTIONS,
    useValue: { ...defaultOptions, ...options },
  };
}
