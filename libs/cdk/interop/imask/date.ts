import { inject, InjectionToken } from '@angular/core';
import { format, isValid, parse } from 'date-fns';
import 'imask/masked/date';
import { MaskedDate } from 'imask';
import { IMaskImpl } from './base';

import { X_DATE_MASK_OPTIONS, XDateMaskOptions } from '@mixin-ui/cdk/providers';

type Block = {
  [token: string]: {
    mask: typeof IMaskImpl.Mask.MaskedRange;
    from: number;
    to: number;
  };
};

const RANGES = {
  // Numeric: 2 digits + zero padded (02, 20)
  yy: { from: 0, to: 99 },

  // Numeric: 4 digits + zero padded (0002, 2024)
  yyyy: { from: 0, to: 9999 },

  // Numeric: 1 digit (9, 12)
  M: { from: 1, to: 12 },

  // Numeric: 2 digits + zero padded (09, 12)
  MM: { from: 1, to: 12 },

  // Numeric: minimum digits (1)
  d: { from: 1, to: 31 },

  // Numeric: 2 digits + zero padded (01)
  dd: { from: 1, to: 31 },
} as const;

const TOKEN_REGEX = /yyyy|yy|MM|M|dd|d/g;

// @TODO: normalize pattern with '`' to prevent symbols shift back
const adapter = (options: XDateMaskOptions) => {
  const tokens = options.pattern.match(TOKEN_REGEX) || [];

  if (tokens.length === 0) {
    throw new Error(ngDevMode ? `No valid tokens found in pattern: ${options.pattern}` : '');
  }

  const blocks: Block = {};
  const uniqueTokens = Array.from(new Set(tokens));

  for (const token of uniqueTokens) {
    const range = RANGES[token as keyof typeof RANGES];

    if (range) {
      blocks[token] = {
        mask: IMaskImpl.Mask.MaskedRange,
        ...range,
      };
    }
  }

  return {
    mask: Date,
    lazy: !options.showFiller,
    placeholderChar: options.fillerChar,
    min: options.min,
    max: options.max,
    overwrite: true,
    autofix: true,
    validate: function (this: MaskedDate): boolean {
      return this.isComplete ? isValid(this.date) : true;
    },
    parse: (value: string): Date => {
      return parse(value, options.pattern, Date.now());
    },
    format: (value: Date | null): string => {
      return value ? format(value, options.pattern) : '';
    },
    pattern: options.pattern,
    blocks,
  };
};

export const X_DATE_MASK_FACTORY = new InjectionToken('DATE_MASK_FACTORY', {
  factory: () => () => new IMaskImpl(adapter, inject(X_DATE_MASK_OPTIONS)),
});
