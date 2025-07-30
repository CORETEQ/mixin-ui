import {
  assertInInjectionContext,
  assertNotInReactiveContext,
  CreateEffectOptions,
  effect,
  EffectCleanupRegisterFn,
  EffectRef,
  untracked,
} from '@angular/core';

type WatchCallback<V = any> = (value: V, onCleanup: EffectCleanupRegisterFn) => void;

/**
 * Registers a side effect with an explicitly declared dependency and deferred execution.
 *
 * Unlike the built-in `effect()` function, `watch()` responds to the fact of state change,
 * enabling event-like orchestration of side effects.
 *
 * **Important considerations for signal-based reactivity:**
 * - Signals are glitch-free by design and don't propagate changes instantly
 * - In synchronous execution contexts, the consumer will be notified only once
 *   and will receive only the final actual value after all synchronous updates complete
 */
export function watch<S>(
  source: () => S,
  fn: WatchCallback<S>,
  options?: CreateEffectOptions
): EffectRef {
  if (ngDevMode) {
    assertNotInReactiveContext(watch);
  }

  if (ngDevMode && !options?.injector) {
    assertInInjectionContext(watch);
  }

  let wasCalled = false;

  return effect(onCleanup => {
    execute: {
      const dep = source();

      if (!wasCalled) {
        wasCalled = true;
        break execute;
      }

      untracked(() => fn(dep, onCleanup));
    }
  }, options);
}
