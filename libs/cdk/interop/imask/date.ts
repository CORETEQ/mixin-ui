import { inject, InjectionToken } from '@angular/core';
import { format, parse } from 'date-fns';
import 'imask/masked/date';
import type { FactoryArg } from 'imask/masked/factory';
import { IMaskImpl } from './base';

import { X_DATE_MASK_OPTIONS, XDateMaskOptions } from '@mixin-ui/cdk/providers';

type Block = {
  [key: string]: {
    mask: typeof IMaskImpl.Mask.MaskedRange;
    from: number;
    to: number;
  };
};

const RANGES = {
  yyyy: { from: 1900, to: 2100 },
  yy: { from: 0, to: 99 },

  MM: { from: 1, to: 12 },
  M: { from: 1, to: 12 },

  dd: { from: 1, to: 31 },
  d: { from: 1, to: 31 },

  HH: { from: 0, to: 23 },
  H: { from: 0, to: 23 },

  hh: { from: 1, to: 12 },
  h: { from: 1, to: 12 },

  mm: { from: 0, to: 59 },
  m: { from: 0, to: 59 },

  ss: { from: 0, to: 59 },
  s: { from: 0, to: 59 },
} as const;

const TOKEN_REGEX = /yyyy|yy|MM|M|dd|d|HH|H|hh|h|mm|m|ss|s/g;

const adapter = (options: XDateMaskOptions): FactoryArg => {
  const tokens = options.pattern.match(TOKEN_REGEX) || [];

  if (tokens.length === 0) {
    throw new Error(`No valid date-fns tokens found in pattern: ${options.pattern}`);
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
    pattern: options.pattern,
    autofix: options.autofix,
    min: options.min,
    max: options.max,
    parse: (value: string) => parse(value, options.pattern, Date.now()),
    format: (value: Date | null) => (value ? format(value, options.pattern) : ''),
    blocks,
  };
};

export const X_DATE_MASK_FACTORY = new InjectionToken('DATE_MASK_FACTORY', {
  factory: () => () => new IMaskImpl(adapter, inject(X_DATE_MASK_OPTIONS)),
});
