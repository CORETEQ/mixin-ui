import { InjectionToken, ValueProvider } from '@angular/core';

export interface XGroupOptions {
  readonly orientation: 'horizontal' | 'vertical';
  readonly attached: boolean;
}

const defaultOptions: XGroupOptions = {
  orientation: 'horizontal',
  attached: true,
};

export const X_GROUP_OPTIONS = new InjectionToken<XGroupOptions>('GROUP_OPTIONS', {
  factory: () => defaultOptions,
});

export function provideGroupOptions(options: Partial<XGroupOptions>): ValueProvider {
  return {
    provide: X_GROUP_OPTIONS,
    useValue: { ...defaultOptions, ...options },
  };
}
