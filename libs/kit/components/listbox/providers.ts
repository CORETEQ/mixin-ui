import { ExistingProvider, InjectionToken, Signal, Type } from '@angular/core';
import { XComparator } from '@mixin-ui/kit/providers';

export interface XListboxAccessor<T = any> {
  readonly value: Signal<T | readonly T[] | null>;
  readonly multiple: Signal<boolean>;
  readonly compareFn: Signal<XComparator<T> | undefined>;

  handleOptions(values: readonly T[]): void;
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
