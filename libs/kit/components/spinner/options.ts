import { InjectionToken } from '@angular/core';

// eslint-disable-next-line
export interface XSpinnerOptions {
  // @TODO
}

const defaultOptions: XSpinnerOptions = {};

export const X_SPINNER_OPTIONS = new InjectionToken<XSpinnerOptions>('SPINNER_OPTIONS', {
  factory: () => defaultOptions,
});
