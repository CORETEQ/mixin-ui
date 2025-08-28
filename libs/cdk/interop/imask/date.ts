import { inject, InjectionToken } from '@angular/core';
import { format, isValid, parse } from 'date-fns';
import 'imask/masked/date';
import { MaskedDate } from 'imask';
import { IMaskImpl } from './base';

import { X_DATE_MASK_OPTIONS, XDateMaskOptions, XMaskFactory } from '@mixin-ui/cdk/providers';

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

const TOKEN_REGEX = new RegExp(
  Object.keys(RANGES)
    .sort((a, b) => b.length - a.length)
    .join('|'),
  'g'
);

function processPattern(pattern: string): string {
  let index = 0;

  return pattern.replace(TOKEN_REGEX, match => {
    if (index++ === 0) {
      return match;
    }

    // prevents symbols shift back
    // https://imask.js.org/guide.html#masked-pattern
    return '`' + match;
  });
}

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
    pattern: processPattern(options.pattern),
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
    blocks,
  };
};

export const X_DATE_MASK_FACTORY = new InjectionToken<XMaskFactory<Date | null, XDateMaskOptions>>(
  'DATE_MASK_FACTORY',
  {
    factory: (defaultOptions = inject(X_DATE_MASK_OPTIONS)) => {
      return () => new IMaskImpl(adapter, defaultOptions);
    },
  }
);
