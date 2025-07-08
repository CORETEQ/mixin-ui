import { Observable } from 'rxjs';
import { EMPTY_FN } from '@mixin-ui/cdk/utils';

export function fromResizeObserver(
  target: Element,
  options?: ResizeObserverOptions
): Observable<ReadonlyArray<ResizeObserverEntry>> {
  return new Observable(subscriber => {
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(entries => subscriber.next(entries))
        : new NoopResizeObserver();
    ro.observe(target, options);
    return () => ro.disconnect();
  });
}

class NoopResizeObserver implements ResizeObserver {
  disconnect = EMPTY_FN;
  observe = EMPTY_FN;
  unobserve = EMPTY_FN;
}
