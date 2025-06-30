import { InjectionToken, ValueProvider } from '@angular/core';

export type XPopoverStretch = 'auto' | 'fit';

export interface XPopoverOptions {
  readonly stretch: XPopoverStretch;
  readonly minWidth?: number;
  readonly maxWidth?: number;
  readonly minHeight?: number;
  readonly maxHeight?: number;
}

const defaultOptions: XPopoverOptions = {
  stretch: 'fit',
  maxHeight: 360,
};

export const X_POPOVER_OPTIONS = new InjectionToken<XPopoverOptions>('POPOVER_OPTIONS', {
  factory: () => defaultOptions,
});

export function providePopoverOptions(options: Partial<XPopoverOptions>): ValueProvider {
  return {
    provide: X_POPOVER_OPTIONS,
    useValue: { ...defaultOptions, ...options },
  };
}
