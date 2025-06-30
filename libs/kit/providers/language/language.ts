import { InjectionToken, signal, ValueProvider, WritableSignal } from '@angular/core';
import { X_LANGUAGE_ENGLISH } from './en';

export interface XLanguageOptions {
  readonly dayNames: readonly string[];
  readonly dayNamesShort: readonly string[];
  readonly dayNamesMin: readonly string[];
  readonly monthNames: readonly string[];
  readonly monthNamesShort: readonly string[];
}

export const X_LANGUAGE = new InjectionToken<WritableSignal<XLanguageOptions>>('X_LANG', {
  factory: () => signal(X_LANGUAGE_ENGLISH),
});

export function provideLanguage(options: XLanguageOptions): ValueProvider {
  return {
    provide: X_LANGUAGE,
    useValue: signal(options),
  };
}
