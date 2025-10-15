import { InjectionToken, ValueProvider } from '@angular/core';

export interface XInvalidSubmitOptions {
  readonly scrollOptions: ScrollIntoViewOptions | null;
  readonly markAsTouched: 'all' | 'first' | 'none';
}

const defaultOptions: XInvalidSubmitOptions = {
  scrollOptions: { block: 'center', behavior: 'smooth' },
  markAsTouched: 'all',
};

export const X_INVALID_SUBMIT_OPTIONS = new InjectionToken<XInvalidSubmitOptions>(
  'INVALID_SUBMIT_OPTIONS',
  { factory: () => defaultOptions }
);

export function provideInvalidSubmitOptions(
  options: Partial<XInvalidSubmitOptions>
): ValueProvider {
  return {
    provide: X_INVALID_SUBMIT_OPTIONS,
    useValue: { ...defaultOptions, ...options },
  };
}
