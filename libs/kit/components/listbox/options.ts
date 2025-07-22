import { InjectionToken, ValueProvider } from '@angular/core';
import { XOutlet } from '@mixin-ui/cdk';
import { XUnion } from '@mixin-ui/kit/types';

export interface XListboxOptions {
  readonly size: XUnion<'md' | 'lg' | 'xl'>;
  readonly radius: XUnion<'none' | 'sm' | 'md' | 'lg' | 'full'>;
  readonly wrapNavigation: boolean;
  readonly emptyContent: XOutlet;
}

const defaultOptions: XListboxOptions = {
  size: 'md',
  radius: 'md',
  wrapNavigation: true,
  emptyContent: 'No data',
};

export const X_LISTBOX_OPTIONS = new InjectionToken<XListboxOptions>('LISTBOX_OPTIONS', {
  factory: () => defaultOptions,
});

export function provideListboxOptions(options: Partial<XListboxOptions>): ValueProvider {
  return {
    provide: X_LISTBOX_OPTIONS,
    useValue: { ...defaultOptions, ...options },
  };
}
