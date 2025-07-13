import { InjectionToken } from '@angular/core';

export interface XSpinnerOptions {}

const defaultOptions: XSpinnerOptions = {};

export const X_SPINNER_OPTIONS = new InjectionToken<XSpinnerOptions>('SPINNER_OPTIONS', {
  factory: () => defaultOptions,
});
