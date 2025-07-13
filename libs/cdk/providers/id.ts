import { assertInInjectionContext, inject, InjectionToken, Injector } from '@angular/core';

export const X_ID_FACTORY = new InjectionToken<() => string>('ID_FACTORY', {
  providedIn: 'root',
  factory: () => {
    let nextId = 0;
    return () => `x-${Date.now()}${nextId++}`;
  },
});

export const generateId = (injector?: Injector): string => {
  let factoryFn: () => string;

  if (!injector) {
    assertInInjectionContext(generateId);
    factoryFn = inject(X_ID_FACTORY);
  } else {
    factoryFn = injector.get(X_ID_FACTORY);
  }

  return factoryFn();
};
