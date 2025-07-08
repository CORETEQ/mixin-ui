import { InjectionToken, ValueProvider } from '@angular/core';
import { XUnion } from '@mixin-ui/kit/types';

export interface XSwitchOptions {
  readonly size: XUnion<'sm' | 'md' | 'lg'>;
  readonly radius: XUnion<'none' | 'sm' | 'md' | 'lg' | 'full'>;
  readonly iconChecked?: string;
  readonly iconUnchecked?: string;
}

const defaultOptions: XSwitchOptions = {
  size: 'md',
  radius: 'full',
};

export const X_SWITCH_OPTIONS = new InjectionToken('SWITCH_OPTIONS', {
  factory: () => defaultOptions,
});

export function provideSwitchOptions(options: Partial<XSwitchOptions>): ValueProvider {
  return {
    provide: X_SWITCH_OPTIONS,
    useValue: { ...defaultOptions, ...options },
  };
}
