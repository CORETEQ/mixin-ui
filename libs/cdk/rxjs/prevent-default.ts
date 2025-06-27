import { MonoTypeOperatorFunction, tap } from 'rxjs';

export function preventDefault<T extends Event>(
  predicate?: (event: T) => boolean
): MonoTypeOperatorFunction<T> {
  return tap(e => (!predicate || predicate(e)) && e.preventDefault());
}
