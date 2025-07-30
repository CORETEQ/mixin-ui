import { assertInInjectionContext, inject, type Injector } from '@angular/core';
import { Event as RouterEvent, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';

export function fromRouterEvent<T extends RouterEvent>(
  event: { new (...args: any[]): T },
  options?: { injector: Injector }
): Observable<T> {
  if (ngDevMode && !options?.injector) {
    assertInInjectionContext(fromRouterEvent);
  }

  return (options?.injector.get(Router) || inject(Router)).events.pipe(
    filter((e: unknown): e is T => e instanceof event)
  );
}
