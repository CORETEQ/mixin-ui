import { MonoTypeOperatorFunction, tap } from 'rxjs';

export function preventDefault<T extends Event>(): MonoTypeOperatorFunction<T> {
  return tap(e => e.preventDefault());
}
