import { FactoryProvider, inject, InjectionToken } from '@angular/core';
import { X_NUMBER_MASK_OPTIONS, XNumberMaskOptions } from '@mixin-ui/cdk';

export interface XInputNumberOptions extends XNumberMaskOptions {
  readonly step: number;
}

const defaultOptions: Omit<XInputNumberOptions, keyof XNumberMaskOptions> = {
  step: 1,
};

const defaultOptionsFactory = () => ({
  ...inject(X_NUMBER_MASK_OPTIONS),
  ...defaultOptions,
});

export const X_INPUT_NUMBER_OPTIONS = new InjectionToken<XInputNumberOptions>(
  'INPUT_NUMBER_OPTIONS',
  { factory: defaultOptionsFactory }
);

export function provideInputNumberOptions(options: Partial<XInputNumberOptions>): FactoryProvider {
  return {
    provide: X_INPUT_NUMBER_OPTIONS,
    useFactory: () => ({ ...defaultOptionsFactory(), ...options }),
  };
}
