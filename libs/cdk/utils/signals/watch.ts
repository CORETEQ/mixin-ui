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
