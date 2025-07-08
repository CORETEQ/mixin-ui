import { inject, InjectionToken } from '@angular/core';
import 'imask/masked/number';
import 'imask/masked/dynamic';
import 'imask/masked/pattern';
import type { MaskedNumber } from 'imask';
import type { FactoryArg } from 'imask/masked/factory';
import { IMaskImpl } from './base';

import { X_NUMBER_MASK_OPTIONS, XNumberMaskOptions } from '@mixin-ui/cdk/providers';

const adapter = (options: XNumberMaskOptions) => {
  return {
    mask: [
      { mask: '' },
      {
        mask: `${options.prefix || ''}{value}${options.suffix || ''}`,
        lazy: false,
        blocks: {
          value: {
            mask: Number,
            thousandsSeparator: options.thousandsSeparator,
            padFractionalZeros: options.padDecimals,
            normalizeZeros: options.normalizeZeros,
            radix: options.decimalSeparator,
            scale: options.decimalScale,
            signed: options.min < 0,
            min: options.min,
            max: options.max,
          },
        },
        parse(this: MaskedNumber) {
          const value = this.unmaskedValue;
          return value === '' ? null : Number(value);
        },
      },
    ],
  } as FactoryArg;
};

export const X_NUMBER_MASK_FACTORY = new InjectionToken('NUMBER_MASK_FACTORY', {
  factory: () => () => new IMaskImpl(adapter, inject(X_NUMBER_MASK_OPTIONS)),
});
