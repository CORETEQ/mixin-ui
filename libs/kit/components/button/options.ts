import { InjectionToken, ValueProvider } from '@angular/core';
import { XColor, XUnion } from '@mixin-ui/kit/types';

export interface XButtonOptions {
  readonly type: 'submit' | 'reset' | 'button' | null;
  readonly variant: XUnion<'solid' | 'outline' | 'surface' | 'subtle' | 'ghost' | 'plain'>;
  readonly size: XUnion<'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  readonly radius: XUnion<'none' | 'sm' | 'md' | 'lg' | 'full'>;
  readonly vertical: boolean;
  readonly block: boolean;
  readonly loadingText?: string;
  readonly color?: XColor;
}

const defaultOptions: XButtonOptions = {
  type: 'button',
  variant: 'solid',
  size: 'md',
  radius: 'md',
  vertical: false,
  block: false,
  color: 'orange',
};

export const X_BUTTON_OPTIONS = new InjectionToken<XButtonOptions>('BUTTON_OPTIONS', {
  factory: () => defaultOptions,
});

export function provideButtonOptions(options: Partial<XButtonOptions>): ValueProvider {
  return {
    provide: X_BUTTON_OPTIONS,
    useValue: { ...defaultOptions, ...options },
  };
}
