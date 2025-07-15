import { FactoryProvider, inject, InjectionToken } from '@angular/core';
import { X_PATTERN_MASK_OPTIONS, XPatternMaskOptions } from '@mixin-ui/cdk';

export interface XInputMaskOptions extends XPatternMaskOptions {}

const defaultOptions: Omit<XInputMaskOptions, keyof XPatternMaskOptions> = {};

const defaultOptionsFactory = () => ({
  ...inject(X_PATTERN_MASK_OPTIONS),
  ...defaultOptions,
});

export const X_INPUT_MASK_OPTIONS = new InjectionToken<XInputMaskOptions>('INPUT_MASK_OPTIONS', {
  factory: defaultOptionsFactory,
});

export function provideInputMaskOptions(options: Partial<XInputMaskOptions>): FactoryProvider {
  return {
    provide: X_INPUT_MASK_OPTIONS,
    useFactory: () => ({ ...defaultOptionsFactory(), ...options }),
  };
}
