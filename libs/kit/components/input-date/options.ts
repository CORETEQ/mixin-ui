import { FactoryProvider, inject, InjectionToken } from '@angular/core';
import { X_DATE_MASK_OPTIONS, XDateMaskOptions } from '@mixin-ui/cdk';

export interface XInputDateOptions extends XDateMaskOptions {
  readonly popoverOnFocus: boolean;
  readonly multiple: boolean;
}

const defaultOptions: Omit<XInputDateOptions, keyof XDateMaskOptions> = {
  popoverOnFocus: true,
  multiple: false,
};

const defaultOptionsFactory = () => ({
  ...inject(X_DATE_MASK_OPTIONS),
  ...defaultOptions,
});

export const X_INPUT_DATE_OPTIONS = new InjectionToken<XInputDateOptions>('INPUT_DATE_OPTIONS', {
  factory: defaultOptionsFactory,
});

export function provideInputDateOptions(options: Partial<XInputDateOptions>): FactoryProvider {
  return {
    provide: X_INPUT_DATE_OPTIONS,
    useFactory: () => ({ ...defaultOptionsFactory(), ...options }),
  };
}
