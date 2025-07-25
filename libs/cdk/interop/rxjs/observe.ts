import { assertInInjectionContext, DestroyRef, inject, Injector } from '@angular/core';
import type { Observable } from 'rxjs';

type ObserveCallback<T> = (value: T) => void;

export interface CreateObserveOptions {
  readonly injector?: Injector;
}

export function observe<T>(
  source: Observable<T>,
  fn: ObserveCallback<T>,
  options?: CreateObserveOptions
): () => void {
  if (ngDevMode && !options?.injector) {
    assertInInjectionContext(observe);
  }

  const destroyRef = options?.injector?.get(DestroyRef) ?? inject(DestroyRef);

  // eslint-disable-next-line prefer-const
  let destroyUnregisterFn: (() => void) | undefined;

  const sub = source.subscribe({
    next: fn,
    error: () => {
      destroyUnregisterFn?.();
    },
    complete: () => {
      destroyUnregisterFn?.();
    },
  });

  const cleanupFn = sub.unsubscribe.bind(sub);
  destroyUnregisterFn = destroyRef.onDestroy(cleanupFn);

  return cleanupFn;
}
