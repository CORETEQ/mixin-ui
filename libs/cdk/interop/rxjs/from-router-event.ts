import { assertInInjectionContext, inject, type Injector } from '@angular/core';
import { Event as RouterEvent, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';

export function fromRouterEvent<T extends RouterEvent>(
  event: { new (...args: any[]): T },
  options?: { injector: Injector }
): Observable<T> {
  let router: Router;

  if (!options?.injector) {
    assertInInjectionContext(fromRouterEvent);
    router = inject(Router);
  } else {
    router = options.injector.get(Router);
  }

  return router.events.pipe(filter((e: unknown): e is T => e instanceof event));
}
