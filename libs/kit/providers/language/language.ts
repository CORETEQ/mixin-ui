import { InjectionToken, signal, WritableSignal } from '@angular/core';
import { X_LANGUAGE_ENGLISH } from './en';

export interface XLanguageOptions {
  readonly dayNames: readonly string[];
  readonly dayNamesShort: readonly string[];
  readonly dayNamesMin: readonly string[];
  readonly monthNames: readonly string[];
  readonly monthNamesShort: readonly string[];
}

export const X_LANGUAGE = new InjectionToken<WritableSignal<XLanguageOptions>>('X_LANGUAGE', {
  factory: () => signal(X_LANGUAGE_ENGLISH),
});
