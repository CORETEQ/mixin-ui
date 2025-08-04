import { DestroyRef, ElementRef, FactoryProvider, inject, InjectionToken } from '@angular/core';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { Observable } from 'rxjs';

export const X_FOCUS_MONITOR = new InjectionToken<Observable<FocusOrigin>>('FOCUS_MONITOR');

export function provideFocusMonitor(checkChildren?: boolean): FactoryProvider {
  return {
    provide: X_FOCUS_MONITOR,
    useFactory: (
      el = inject(ElementRef).nativeElement,
      monitor = inject(FocusMonitor),
      destroyRef = inject(DestroyRef)
    ) => {
      destroyRef.onDestroy(() => monitor.stopMonitoring(el));
      return monitor.monitor(el, checkChildren);
    },
  };
}
