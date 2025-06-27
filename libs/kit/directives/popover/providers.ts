import { ElementRef, inject, InjectionToken, Provider } from '@angular/core';
import { InputModalityDetector } from '@angular/cdk/a11y';
import {
  asapScheduler,
  debounceTime,
  EMPTY,
  filter,
  fromEvent,
  map,
  Observable,
  race,
  switchMap,
} from 'rxjs';
import {
  isPureEscape,
  overlay,
  relatedTo,
  XConnectedOverlay,
  XConnectedOverlayPosition,
} from '@mixin-ui/cdk';

export const X_OVERLAY = new InjectionToken<XConnectedOverlay>('OVERLAY');

export const X_POPOVER_POSITION_OPTIONS = new InjectionToken<XConnectedOverlayPosition>(
  'POPOVER_POSITION_OPTIONS'
);

export const X_POPOVER_CLOSE = new InjectionToken<Observable<boolean>>('OVERLAY_CLOSE');

export const X_POPOVER_PROVIDERS: Provider[] = [
  {
    provide: X_OVERLAY,
    useFactory: overlay,
  },
  {
    provide: X_POPOVER_CLOSE,
    useFactory: (
      el = inject(ElementRef).nativeElement,
      overlay = inject(X_OVERLAY),
      modality = inject(InputModalityDetector)
    ) =>
      overlay.openChanges.pipe(
        switchMap(open => {
          return open
            ? race(
                overlay.outsidePointerEvents,
                overlay.backdropEvents,
                overlay.keydownEvents.pipe(filter(isPureEscape)),
                fromEvent<FocusEvent>(el, 'focusout').pipe(
                  filter(e => {
                    return (
                      modality.mostRecentModality === 'keyboard' && !relatedTo(e, overlay.element)
                    );
                  })
                ),
                fromEvent<FocusEvent>(overlay.element!, 'focusout').pipe(
                  filter(e => {
                    return (
                      modality.mostRecentModality === 'keyboard' &&
                      !(relatedTo(e, overlay.element) || relatedTo(e, el))
                    );
                  })
                )
              )
            : EMPTY;
        }),
        debounceTime(0, asapScheduler),
        map(() => false)
      ),
  },
  {
    provide: X_POPOVER_POSITION_OPTIONS,
    useFactory: (hasParentOverlay = inject(X_OVERLAY, { skipSelf: true, optional: true })) => ({
      direction: hasParentOverlay ? 'horizontal' : 'vertical',
      position: hasParentOverlay ? 'end' : 'bottom',
      align: 'start',
      offset: 4,
      fixedPosition: false,
    }),
  },
];
