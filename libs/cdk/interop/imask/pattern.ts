import { inject, InjectionToken } from '@angular/core';
import 'imask/masked/function';
import { IMaskImpl } from './base';

import { X_PATTERN_MASK_OPTIONS, XMaskFactory, XPatternMaskOptions } from '@mixin-ui/cdk/providers';

const adapter = ({ pattern, showFiller, fillerChar }: XPatternMaskOptions) => {
  const options = {
    lazy: !showFiller,
    placeholderChar: fillerChar,
  };

  if (pattern) {
    return { ...options, mask: pattern };
  } else {
    return { ...options, mask: () => true };
  }
};

export const X_PATTERN_MASK_FACTORY = new InjectionToken<XMaskFactory<string, XPatternMaskOptions>>(
  'PATTERN_MASK_FACTORY',
  {
    factory: (defaultOptions = inject(X_PATTERN_MASK_OPTIONS)) => {
      return () => new IMaskImpl(adapter, defaultOptions);
    },
  }
);
