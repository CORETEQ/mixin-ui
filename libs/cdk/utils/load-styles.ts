import { assertInInjectionContext, inject, Injector, Type } from '@angular/core';
import { _CdkPrivateStyleLoader } from '@angular/cdk/private';

export function loadStyles(component: Type<unknown>, options?: { injector: Injector }): void {
  if (options?.injector) {
    assertInInjectionContext(loadStyles);
  }

  (options?.injector.get(_CdkPrivateStyleLoader) || inject(_CdkPrivateStyleLoader)).load(component);
}
