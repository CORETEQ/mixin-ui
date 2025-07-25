import {
  CreateEffectOptions,
  effect,
  EffectCleanupRegisterFn,
  EffectRef,
  untracked,
} from '@angular/core';

type WatchCallback<V = any> = (value: V, onCleanup: EffectCleanupRegisterFn) => void;

export function watch<S>(
  source: () => S,
  fn: WatchCallback<S>,
  options?: CreateEffectOptions
): EffectRef {
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
