import { InjectionToken, signal, WritableSignal } from '@angular/core';
import { X_I18N_EN } from './en';

export interface XDictionary {
  readonly dayNames: readonly string[];
  readonly dayNamesShort: readonly string[];
  readonly dayNamesMin: readonly string[];
  readonly monthNames: readonly string[];
  readonly monthNamesShort: readonly string[];
}

export const X_I18N = new InjectionToken<WritableSignal<XDictionary>>('I18N', {
  factory: () => signal(X_I18N_EN),
});
