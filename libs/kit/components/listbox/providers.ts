import { ExistingProvider, InjectionToken, Signal, Type } from '@angular/core';
import { XComparator } from '@mixin-ui/kit/providers';
import { Observable } from 'rxjs';

export interface XListboxAccessor<T = any> {
  readonly selection: Signal<T | readonly T[] | null>;
  readonly multiple?: Signal<boolean>;
  readonly comparator?: Signal<XComparator<T>>;
  readonly keyboardEvents?: Observable<KeyboardEvent>;

  handleListboxValue(value: readonly T[]): void;

  handleListboxOptions?(options: readonly T[] | null): void;
}

export const X_LISTBOX_ACCESSOR = new InjectionToken<XListboxAccessor>('LISTBOX_ACCESSOR');

export function provideListboxAccessor<T>(
  useExisting: Type<XListboxAccessor<T>>
): ExistingProvider {
  return {
    provide: X_LISTBOX_ACCESSOR,
    useExisting,
  };
}
