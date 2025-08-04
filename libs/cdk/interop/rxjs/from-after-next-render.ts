import { afterNextRender, AfterRenderOptions, assertInInjectionContext } from '@angular/core';
import { Observable } from 'rxjs';

export function fromAfterNextRender(
  options?: Omit<AfterRenderOptions, 'manualCleanup'>
): Observable<void> {
  if (ngDevMode && !options?.injector) {
    assertInInjectionContext(fromAfterNextRender);
  }

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
