import { InjectionToken, ValueProvider } from '@angular/core';
import { XOverlayPosition } from '@mixin-ui/cdk';

export type XTooltipEvent = 'hover' | 'focus';

export interface XTooltipOptions {
  readonly on: XTooltipEvent;
  readonly position: XOverlayPosition;
  readonly variant: 'dark' | 'light';
  readonly withArrow: boolean;
  readonly offset: number;
  readonly openDelay: number;
  readonly closeDelay: number;
}

const defaultOptions: XTooltipOptions = {
  on: 'hover',
  variant: 'dark',
  withArrow: true,
  position: 'top',
  offset: 8,
  openDelay: 300,
  closeDelay: 100,
};

export const X_TOOLTIP_OPTIONS = new InjectionToken<XTooltipOptions>('TOOLTIP_OPTIONS', {
  factory: () => defaultOptions,
});

export function provideTooltipOptions(options: Partial<XTooltipOptions>): ValueProvider {
  return {
    provide: X_TOOLTIP_OPTIONS,
    useValue: { ...defaultOptions, ...options },
  };
}
