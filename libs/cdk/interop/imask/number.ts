import { inject, InjectionToken } from '@angular/core';
import 'imask/masked/number';
import 'imask/masked/dynamic';
import 'imask/masked/pattern';
import type { MaskedNumber } from 'imask';
import { IMaskImpl } from './base';

import { X_NUMBER_MASK_OPTIONS, XMaskFactory, XNumberMaskOptions } from '@mixin-ui/cdk/providers';

const adapter = (options: XNumberMaskOptions): Record<string, any> => {
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
            min: options.min,
            max: options.max,
          },
        },
        parse(this: MaskedNumber): number | null {
          const value = this.unmaskedValue;
          return value === '' ? null : Number(value);
        },
      },
    ],
  };
};

export const X_NUMBER_MASK_FACTORY = new InjectionToken<
  XMaskFactory<number | null, XNumberMaskOptions>
>('NUMBER_MASK_FACTORY', {
  factory: (defaultOptions = inject(X_NUMBER_MASK_OPTIONS)) => {
    return () => new IMaskImpl(adapter, defaultOptions);
  },
});
