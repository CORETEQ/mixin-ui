import { ExistingProvider, InjectionToken, Type } from '@angular/core';
import { Observable } from 'rxjs';

export const X_CONTROL_ACCESSOR = new InjectionToken<XControlAccessor<any>>('CONTROL_ACCESSOR');

export interface XControlAccessor<T> {
  readonly controlChanges: Observable<T>;

  handleControlValue(value: T): void;
}

export function provideControlAccessor<T>(
  useExisting: Type<XControlAccessor<T>>
): ExistingProvider {
  return {
    provide: X_CONTROL_ACCESSOR,
    useExisting,
  };
}
