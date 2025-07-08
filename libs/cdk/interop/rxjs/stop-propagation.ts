import { MonoTypeOperatorFunction, tap } from 'rxjs';

export function stopPropagation<T extends Event>(
  predicate?: (event: T) => boolean
): MonoTypeOperatorFunction<T> {
  return tap(e => (!predicate || predicate(e)) && e.stopPropagation());
}
