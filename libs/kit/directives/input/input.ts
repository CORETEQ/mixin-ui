import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  Directive,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  combineLatest,
  EMPTY,
  filter,
  fromEvent,
  map,
  merge,
  share,
  startWith,
  switchMap,
} from 'rxjs';
import { fromMutationObserver, isElement, loadStyles } from '@mixin-ui/cdk';
import { X_INPUT_OPTIONS } from './options';

const FOCUSABLE = 'input, textarea, select, [contenteditable], [tabindex]';
const INTERACTIVE = `${FOCUSABLE}, button, a`;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './input.scss',
  template: '',
})
class XInputStyles {}

@Directive({
  exportAs: 'x-input',
  host: {
    '[class]': '`x-input x-variant-${variant()} x-size-${size()} x-radius-${radius()}`',
    '[class.x-focused]': 'focused()',
    '[class.x-disabled]': 'state()?.disabled',
    '[class.x-pending]': 'state()?.pending',
    '[class.x-invalid]': 'state()?.states && state()?.touched',
    '(pointerdown)': 'onPointerDown($event);',
  },
})
export class XInput {
  readonly #opt = inject(X_INPUT_OPTIONS);
  readonly #selfControl = inject(NgControl, { self: true, optional: true });
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;

  readonly #mo$ = fromMutationObserver(this.#el, {
    attributeFilter: ['readonly'],
    attributes: true,
    childList: true,
  }).pipe(share({ resetOnRefCountZero: true }));

  readonly childControl = contentChild(NgControl);
  readonly variant = input(this.#opt.variant);
  readonly size = input(this.#opt.size);
  readonly radius = input(this.#opt.radius);
  readonly control = computed(() => this.childControl()?.control || this.#selfControl?.control);

  readonly focusableEl = toSignal(
    this.#mo$.pipe(
      startWith(null),
      map(() => this.#el.querySelector(FOCUSABLE))
    )
  );

  readonly focused = toSignal(
    merge(
      fromEvent<FocusEvent>(this.#el, 'focusin').pipe(
        filter(e => isElement(e.target) && e.target.matches(FOCUSABLE)),
        map(() => true)
      ),
      fromEvent(this.#el, 'focusout').pipe(map(() => false))
    ),
    { initialValue: false }
  );

  readonly state = toSignal(
    toObservable(this.control).pipe(
      switchMap(control => {
        return control
          ? combineLatest([
              control.events.pipe(
                startWith(null),
                map(() => control)
              ),
              this.#mo$.pipe(
                startWith(null),
                map(() => this.focusableEl()?.readOnly)
              ),
            ])
          : EMPTY;
      }),
      map(([{ disabled, invalid, touched, pending }, readOnly]) => ({
        disabled,
        invalid,
        touched,
        pending,
        readOnly,
      }))
    ),
    { initialValue: null }
  );

  constructor() {
    loadStyles(XInputStyles);
  }

  focus(): void {
    this.focusableEl()?.focus();
  }

  protected onPointerDown(e: PointerEvent): void {
    const focusable = this.focusableEl();

    if (!focusable || (isElement(e.target) && e.target.closest(INTERACTIVE))) {
      return;
    }

    e.preventDefault();
    focusable.focus();
  }
}
