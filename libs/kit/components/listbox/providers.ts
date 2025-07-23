import { ExistingProvider, InjectionToken, Signal, Type } from '@angular/core';
import type { XComparator } from '@mixin-ui/kit/providers';
import type { Observable } from 'rxjs';
import type { XOption } from './option';

export interface XListboxAccessor<T = any> {
  readonly selection: Signal<T | readonly T[] | null>;

  readonly multiple?: Signal<boolean>;
  readonly comparator?: Signal<XComparator<T>>;
  readonly keyboardEvents?: Observable<KeyboardEvent>;

  handleListboxValue(value: readonly T[]): void;

  handleListboxOptions?(options: readonly XOption<T>[] | null): void;

  handleListboxActiveDescendant?(option: XOption<T> | null): void;
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
