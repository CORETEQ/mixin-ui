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
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  fromEvent,
  map,
  merge,
  startWith,
  switchMap,
} from 'rxjs';
import { fromMutationObserver, isElement, isMatchingTarget, loadStyles } from '@mixin-ui/cdk';
import { X_INPUT_OPTIONS } from './options';

const EDITABLE = 'input, textarea, select, [contenteditable]';
const FOCUSABLE = `${EDITABLE} [tabindex]`;
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
    '[class.x-invalid]': 'state()?.invalid && state()?.touched',
    '(pointerdown)': 'handlePointerDown($event);',
  },
})
export class XInputBase {
  readonly #opt = inject(X_INPUT_OPTIONS);
  readonly #selfControl = inject(NgControl, { self: true, optional: true });
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;

  readonly childControl = contentChild(NgControl);
  readonly variant = input(this.#opt.variant);
  readonly size = input(this.#opt.size);
  readonly radius = input(this.#opt.radius);
  readonly control = computed(() => this.childControl()?.control || this.#selfControl?.control);

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
                debounceTime(0),
                startWith(null),
                map(() => control)
              ),
              fromMutationObserver(this.#el, {
                subtree: true,
                attributes: true,
                attributeFilter: ['readonly'],
              }).pipe(
                startWith(null),
                map(() => this.#el.querySelector(EDITABLE)?.readOnly),
                distinctUntilChanged()
              ),
            ])
          : EMPTY;
      }),
      map(([control, readOnly]) => ({
        disabled: control.disabled,
        invalid: control.invalid,
        touched: control.touched,
        pending: control.pending,
        readOnly,
      }))
    ),
    { initialValue: null }
  );

  constructor() {
    loadStyles(XInputStyles);
  }

  handlePointerDown(e: PointerEvent): void {
    const focusableEl = this.#el.querySelector(FOCUSABLE);

    if (!focusableEl || isMatchingTarget(e, INTERACTIVE)) {
      return;
    }

    e.preventDefault();
    focusableEl.focus();
  }
}
