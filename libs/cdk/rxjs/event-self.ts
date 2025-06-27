import { MonoTypeOperatorFunction, filter } from 'rxjs';

export function eventSelf<T extends Event>(): MonoTypeOperatorFunction<T> {
  return filter(e => e.target === e.currentTarget);
}
