import { InjectionToken, ValueProvider } from '@angular/core';
import { XColor, XUnion } from '@mixin-ui/kit/types';

export interface XInputOptions {
  readonly variant: XUnion<'outline'>;
  readonly size: XUnion<'md' | 'lg' | 'xl'>;
  readonly radius: XUnion<'none' | 'sm' | 'md' | 'lg' | 'full'>;
  readonly color?: XColor;
}

const defaultOptions: XInputOptions = {
  variant: 'outline',
  size: 'md',
  radius: 'md',
};

export const X_INPUT_OPTIONS = new InjectionToken<XInputOptions>('INPUT_OPTIONS', {
  factory: () => defaultOptions,
});

export function provideInputOptions(options: Partial<XInputOptions>): ValueProvider {
  return {
    provide: X_INPUT_OPTIONS,
    useValue: { ...defaultOptions, ...options },
  };
}
