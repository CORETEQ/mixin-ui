import {
  assertInInjectionContext,
  assertNotInReactiveContext,
  DestroyRef,
  inject,
  Injector,
} from '@angular/core';
import type { Observable } from 'rxjs';

type ObserveCallback<T> = (value: T) => void;

export interface CreateObserveOptions {
  readonly injector?: Injector;
}

/**
 * Registers a side effect with an explicitly declared dependency that is RxJS observable.
 *
 * ### Motivation
 *
 * Angular's built-in `effect()` function provides a declarative way to register side effects
 * in the signal-based (pull-driven) reactive model, with automatic cleanup managed by the framework.
 *
 * In contrast, working with RxJS (push-driven) Observables requires manual subscription management,
 * including explicit unsubscription logic to avoid memory leaks.
 *
 * This asymmetry can lead to inconsistencies in how developers manage reactive side effects.
 * The `observe()` function bridges this gap by offering a similar API for Observables,
 * enabling automatic cleanup via `DestroyRef`.
 *
 * @example
 * ```ts
 *
 * constructor() {
 *   // Traditional pattern with takeUntilDestroyed():
 *   changes.pipe(takeUntilDestroyed()).subscribe(value => {
 *     console.log('value:', value);
 *   });
 *
 *   // Using observe() to abstract away cleanup logic:
 *   observe(changes, value => {
 *     console.log('value:', value);
 *   });
 * }
 * ```
 */
export function observe<T>(
  source: Observable<T>,
  fn: ObserveCallback<T>,
  options?: CreateObserveOptions
): () => void {
  if (ngDevMode) {
    assertNotInReactiveContext(observe);
  }

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
