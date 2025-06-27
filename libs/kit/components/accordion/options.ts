import { InjectionToken, ValueProvider } from '@angular/core';
import { XUnion } from '@mixin-ui/kit/types';

export interface XAccordionOptions {
  readonly size: XUnion<'sm' | 'md' | 'lg'>;
  readonly radius: XUnion<'none' | 'sm' | 'md' | 'lg'>;
  readonly multiple: boolean;
  readonly withIcon: boolean;
}

const defaultOptions: XAccordionOptions = {
  size: 'md',
  radius: 'lg',
  multiple: false,
  withIcon: true,
};

export const X_ACCORDION_OPTIONS = new InjectionToken<XAccordionOptions>('ACCORDION_OPTIONS', {
  factory: () => defaultOptions,
});

export function provideAccordionOptions(options: Partial<XAccordionOptions>): ValueProvider {
  return {
    provide: X_ACCORDION_OPTIONS,
    useValue: { ...defaultOptions, ...options },
  };
}
