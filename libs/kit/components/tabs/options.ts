import { InjectionToken, ValueProvider } from '@angular/core';

export interface XTabsOptions {}

const defaultOptions: XTabsOptions = {};

export const X_TABS_OPTIONS = new InjectionToken<XTabsOptions>('TABS_OPTIONS', {
  factory: () => defaultOptions,
});

export function provideTabsOptions(options: Partial<XTabsOptions>): ValueProvider {
  return {
    provide: X_TABS_OPTIONS,
    useValue: { ...defaultOptions, ...options },
  };
}
