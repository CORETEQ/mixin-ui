import { InjectionToken } from '@angular/core';

export type XPopoverStretch = 'auto' | 'fit';

export interface XPopoverOptions {
  readonly stretch: XPopoverStretch;
  readonly minWidth?: number;
  readonly maxWidth?: number;
  readonly minHeight?: number;
  readonly maxHeight?: number;
  readonly hasBackdrop?: boolean;
}

const defaultOptions: XPopoverOptions = {
  stretch: 'fit',
  maxHeight: 360,
};

export const X_POPOVER_OPTIONS = new InjectionToken<XPopoverOptions>('POPOVER_OPTIONS', {
  factory: () => defaultOptions,
});
