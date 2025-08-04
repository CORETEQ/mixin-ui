import { Observable } from 'rxjs';
import { EMPTY_FN } from '@mixin-ui/cdk/utils';

export function fromMutationObserver(
  target: Node,
  options?: MutationObserverInit
): Observable<ReadonlyArray<MutationRecord>> {
  return new Observable(subscriber => {
    const mo =
      typeof MutationObserver !== 'undefined'
        ? new MutationObserver(mutations => subscriber.next(mutations))
        : new NoopMutationObserver();
    mo.observe(target, options);
    return () => mo.disconnect();
  });
}

class NoopMutationObserver implements MutationObserver {
  disconnect = EMPTY_FN;
  observe = EMPTY_FN;
  takeRecords = () => [];
}
