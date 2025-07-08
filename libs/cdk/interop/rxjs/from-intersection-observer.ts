import { Observable } from 'rxjs';
import { EMPTY_FN } from '@mixin-ui/cdk/utils';

export function fromIntersectionObserver(
  target: Element,
  options?: IntersectionObserverInit
): Observable<ReadonlyArray<IntersectionObserverEntry>> {
  return new Observable(subscriber => {
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(entries => subscriber.next(entries), options)
        : new NoopIntersectionObserver();
    io.observe(target);
    return () => io.disconnect();
  });
}

class NoopIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = Object.freeze([]);

  disconnect = EMPTY_FN;
  observe = EMPTY_FN;
  unobserve = EMPTY_FN;
  takeRecords = () => [];
}
