import { ExistingProvider, InjectionToken, Type } from '@angular/core';
import { Observable } from 'rxjs';

export const X_CONTROL_ACCESSOR = new InjectionToken<XControlAccessor<any>>('CONTROL_ACCESSOR');

export interface XControlAccessor<T> {
  readonly valueChanges: Observable<T>;
  readonly setValue: (value: T) => void;
  readonly onControlInit?: (element: HTMLElement) => void;
  readonly onControlDestroy?: () => void;
}

export function provideControlAccessor<T>(
  useExisting: Type<XControlAccessor<T>>
): ExistingProvider {
  return {
    provide: X_CONTROL_ACCESSOR,
    useExisting,
  };
}
