import { MonoTypeOperatorFunction, tap } from 'rxjs';

export function stopPropagation<T extends Event>(): MonoTypeOperatorFunction<T> {
  return tap(e => e.stopPropagation());
}
