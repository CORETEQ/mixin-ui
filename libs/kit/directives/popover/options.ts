import { InjectionToken } from '@angular/core';
import { XPopoverPositionOptions } from '@mixin-ui/cdk';

export type XPopoverStretch = 'auto' | 'fit';

export interface XPopoverOptions extends XPopoverPositionOptions {
  readonly stretch: XPopoverStretch;
  readonly minWidth?: number;
  readonly maxWidth?: number;
  readonly minHeight?: number;
  readonly maxHeight?: number;
}

const defaultOptions: XPopoverOptions = {
  direction: 'vertical',
  position: 'bottom',
  align: 'start',
  offset: 4,
  fixed: false,
  stretch: 'fit',
  maxHeight: 360,
};

export const X_POPOVER_OPTIONS = new InjectionToken<XPopoverOptions>('POPOVER_OPTIONS', {
  factory: () => defaultOptions,
});
