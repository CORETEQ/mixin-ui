import { inject, InjectionToken } from '@angular/core';
import { format, isValid, parse } from 'date-fns';
import 'imask/masked/date';
import { IMaskImpl } from './base';
import type { MaskedDate } from 'imask';

import { X_DATE_MASK_OPTIONS, XDateMaskOptions, XMaskFactory } from '@mixin-ui/cdk/providers';

type Block = {
  [token: string]: {
    mask: typeof IMaskImpl.Mask.MaskedRange;
    from: number;
    to: number;
  };
};

/**
 * Predefined numeric ranges for supported date/time tokens.
 * These define valid digit ranges for each segment of the date pattern.
 *
 * For example:
 *  - 'dd' → allows 01–31
 *  - 'MM' → allows 01–12
 *  - 'yyyy' → allows 0000–9999
 *
 * These ranges are used to configure IMask `MaskedRange` blocks,
 * which restrict user input to valid numeric intervals.
 */
const RANGES = {
  // Year: 2 digits, zero-padded (e.g. 02, 20)
  yy: { from: 0, to: 99 },

  // Year: 4 digits, zero-padded (e.g. 0002, 2024)
  yyyy: { from: 0, to: 9999 },

  // Month: 1–12 (non-padded)
  M: { from: 1, to: 12 },

  // Month: 01–12 (zero-padded)
  MM: { from: 1, to: 12 },

  // Day: 1–31 (non-padded)
  d: { from: 1, to: 31 },

  // Day: 01–31 (zero-padded)
  dd: { from: 1, to: 31 },

  // Hours: 00–23 (24-hour format)
  HH: { from: 0, to: 23 },

  // Minutes: 00–59
  mm: { from: 0, to: 59 },
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
