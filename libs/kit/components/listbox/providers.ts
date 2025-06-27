import { InjectionToken, Signal } from '@angular/core';

export interface XListboxAccessor<T = any> {
  readonly value: Signal<T | readonly T[] | null>;
  readonly multiple: Signal<boolean>;
  readonly select: (values: readonly T[]) => void;
}

export const X_LISTBOX_ACCESSOR = new InjectionToken<XListboxAccessor>('LISTBOX_ACCESSOR');
