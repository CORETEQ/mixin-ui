import {
  CreateEffectOptions,
  effect,
  EffectCleanupRegisterFn,
  EffectRef,
  Signal,
  untracked,
} from '@angular/core';

type WatchCallback<T = any> = (value: T, onCleanup: EffectCleanupRegisterFn) => void;

type MapSignals<T> = T extends Signal<infer V>
  ? V
  : T extends readonly [...infer A]
  ? { [K in keyof A]: A[K] extends Signal<infer V> ? V : never }
  : T extends object
  ? T
  : never;

/**
 * Watches one or more signals and invokes the callback only in response to actual changes,
 * skipping the initial invocation. This enables event-like reactivity, similar to `rxjs.subscribe`.
 *
 * Unlike `effect`, the callback is not run during setup, but only when the observed signal(s) update.
 *
 * The API is intentionally distinct from `effect` to encourage explicit and conscious
 * subscription to reactive changes.
 */
export function watch<T extends Signal<any>>(
  signal: T,
  fn: WatchCallback<MapSignals<T>>,
  options?: CreateEffectOptions
): EffectRef;
export function watch<T extends Signal<any>[]>(
  signals: [...T],
  fn: WatchCallback<MapSignals<T>>,
  options?: CreateEffectOptions
): EffectRef;
export function watch<T = any>(
  signalOrMultiSignals: Signal<T> | Signal<any>[],
  fn: WatchCallback<MapSignals<T>>,
  options?: CreateEffectOptions
): EffectRef {
  let initialized = false;

  return effect(onCleanup => {
    const args = Array.isArray(signalOrMultiSignals)
      ? signalOrMultiSignals.map(signal => signal())
      : signalOrMultiSignals();

    untracked(() => {
      if (!initialized) {
        initialized = true;
        return;
      }

      fn(args as any, onCleanup);
    });
  }, options);
}
