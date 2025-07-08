import { afterNextRender, AfterRenderOptions } from '@angular/core';
import { Observable } from 'rxjs';

export function fromAfterNextRender(
  options?: Omit<AfterRenderOptions, 'manualCleanup' | 'injector'>
): Observable<void> {
  return new Observable(subscriber => {
    const ref = afterNextRender(
      () => {
        subscriber.next();
        subscriber.complete();
      },
      { ...options, manualCleanup: true }
    );

    return () => ref.destroy();
  });
}
