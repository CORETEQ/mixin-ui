import { Directive, effect, ElementRef, inject, input, untracked } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  delay,
  distinctUntilChanged,
  EMPTY,
  filter,
  fromEvent,
  map,
  merge,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import {
  createPopover,
  isPureEscape,
  observe,
  provideFocusMonitor,
  relatedTo,
  X_FOCUS_MONITOR,
  XOutlet,
} from '@mixin-ui/cdk';
import { XTooltipContainer } from './container';
import { X_TOOLTIP_OPTIONS, XTooltipEvent } from './options';

@Directive({
  selector: '[x-tooltip]',
  exportAs: 'x-tooltip',
  providers: [provideFocusMonitor()],
})
export class XTooltip {
  readonly #overlay = createPopover();
  readonly #opt = inject(X_TOOLTIP_OPTIONS);
  readonly #el = inject(ElementRef).nativeElement;
  readonly #focusChanges = inject(X_FOCUS_MONITOR);

  readonly content = input<XOutlet>(null, { alias: 'x-tooltip' });
  readonly event = input(this.#opt.on, { alias: 'x-tooltip-on' });
  readonly _position = input(this.#opt.position, { alias: 'x-tooltip-position' });
  readonly offset = input(this.#opt.offset, { alias: 'x-tooltip-offset' });
  readonly fixed = input(this.#opt.fixed, { alias: 'x-tooltip-fixed' });
  readonly variant = input(this.#opt.variant, { alias: 'x-tooltip-variant' });
  readonly withArrow = input(this.#opt.withArrow, { alias: 'x-tooltip-with-arrow' });
  readonly openDelay = input(this.#opt.openDelay, { alias: 'x-tooltip-open-delay' });
  readonly closeDelay = input(this.#opt.closeDelay, { alias: 'x-tooltip-close-delay' });
  readonly position = toSignal(this.#overlay.positionChanges);

  readonly #openChanges = toObservable(this.event).pipe(
    switchMap(event =>
      merge(
        this.getHandler(event),
        this.#focusChanges.pipe(
          filter(origin => origin === 'keyboard' || !origin),
          map(Boolean)
        ),
        this.#overlay.keydownEvents.pipe(
          filter(isPureEscape),
          map(() => false)
        )
      )
    ),
    distinctUntilChanged()
  );

  constructor() {
    effect(() => {
      const content = this.content();
      const position = this._position();
      const offset = this.offset();

      untracked(() => {
        if (content) {
          Promise.resolve().then(() => this.updatePosition(position, offset));
        } else {
          this.toggle(false);
        }
      });
    });

    observe(this.#openChanges, open => {
      this.toggle(open);
    });
  }

  toggle(open: boolean): void {
    if (open && this.content()) {
      this.#overlay.open(XTooltipContainer, {
        position: this._position(),
        offset: this.offset(),
        fixed: this.fixed(),
        direction: 'both',
        align: 'center',
      });
    } else if (!open) {
      this.#overlay.close();
    }
  }

  updatePosition(position = this._position(), offset = this.offset()): void {
    this.#overlay.updatePosition({ position, offset });
  }

  private getHandler(event: XTooltipEvent): Observable<boolean> {
    switch (event) {
      case 'hover':
        return merge(
          fromEvent(this.#el, 'mouseenter').pipe(map(() => true)),
          fromEvent<MouseEvent>(this.#el, 'mouseleave').pipe(
            filter(e => !relatedTo(e, this.#overlay.element)),
            map(() => false)
          ),
          this.#overlay.openChanges.pipe(
            switchMap(open =>
              open && this.#overlay.element
                ? fromEvent<MouseEvent>(this.#overlay.element, 'mouseleave')
                : EMPTY
            ),
            filter(e => !relatedTo(e, this.#el)),
            map(() => false)
          )
        ).pipe(
          switchMap(open => of(open).pipe(delay(open ? this.openDelay() : this.closeDelay())))
        );
      case 'focus':
        return this.#focusChanges.pipe(map(origin => origin === 'mouse'));
      default:
        console.warn(ngDevMode ? `Unknown event: ${event}` : '');
        return EMPTY;
    }
  }
}
