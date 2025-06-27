import { InjectionToken } from '@angular/core';

export type XPopoverWidth = 'auto' | 'inherit';

export interface XPopoverOptions {
  readonly width: XPopoverWidth;
  readonly minWidth?: number;
  readonly maxWidth?: number;
  readonly minHeight?: number;
  readonly maxHeight?: number;
  readonly hasBackdrop?: boolean;
}

const defaultOptions: XPopoverOptions = {
  width: 'inherit',
  maxHeight: 360,
};

export const X_POPOVER_OPTIONS = new InjectionToken<XPopoverOptions>('POPOVER_OPTIONS', {
  factory: () => defaultOptions,
});
