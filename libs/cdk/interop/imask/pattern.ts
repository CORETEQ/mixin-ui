import { inject, InjectionToken } from '@angular/core';
import type { FactoryArg } from 'imask/masked/factory';
import { IMaskImpl } from './base';

import { X_PATTERN_MASK_OPTIONS, XPatternMaskOptions } from '@mixin-ui/cdk/providers';

const adapter = (options: XPatternMaskOptions) => {
  return {
    mask: options.pattern,
    lazy: !options.showFiller,
    placeholderChar: options.fillerChar,
  } as FactoryArg;
};

export const X_PATTERN_MASK_FACTORY = new InjectionToken('PATTERN_MASK_FACTORY', {
  factory: () => () => new IMaskImpl(adapter, inject(X_PATTERN_MASK_OPTIONS)),
});
