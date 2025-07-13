import { InjectionToken } from '@angular/core';

export interface XFieldOptions {
  readonly withMark?: boolean;
}

const defaultOptions: XFieldOptions = {
  withMark: true,
};

export const X_FIELD_OPTIONS = new InjectionToken<XFieldOptions>('FIELD_OPTIONS', {
  factory: () => defaultOptions,
});
