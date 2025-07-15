import { inject, InjectionToken } from '@angular/core';
import { IMaskImpl } from './base';

import { X_PATTERN_MASK_OPTIONS, XPatternMaskOptions } from '@mixin-ui/cdk/providers';

const adapter = (options: XPatternMaskOptions) => ({
  mask: options.pattern,
  lazy: !options.showFiller,
  placeholderChar: options.fillerChar,
});

export const X_PATTERN_MASK_FACTORY = new InjectionToken('PATTERN_MASK_FACTORY', {
  factory: () => () => new IMaskImpl(adapter, inject(X_PATTERN_MASK_OPTIONS)),
});
