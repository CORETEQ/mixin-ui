import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  forwardRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import {
  injectMask,
  isElement,
  provideMask,
  X_DATE_MASK_FACTORY,
  XDateMaskOptions,
} from '@mixin-ui/cdk';
import {
  provideControlAccessor,
  XControlAccessor,
  XInput,
  XPopover,
} from '@mixin-ui/kit/directives';
import { X_INPUT_DATE_OPTIONS } from './options';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-date',
  templateUrl: './input-date.html',
  providers: [provideMask(X_DATE_MASK_FACTORY), provideControlAccessor(forwardRef(() => XDate))],
  hostDirectives: [
    {
      directive: XInput,
      inputs: ['variant', 'size', 'radius', 'color'],
    },
    {
      directive: XPopover,
    },
  ],
  host: {
    class: 'x-date',
    '(focusin)': 'onFocusIn()',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class XDate implements XControlAccessor<Date | null> {
  readonly #opt = inject(X_INPUT_DATE_OPTIONS);
  readonly #mask = injectMask<Date | null, XDateMaskOptions>();
  readonly #popover = inject(XPopover, { self: true });

  readonly min = input(this.#opt.min);
  readonly max = input(this.#opt.max);
  readonly autofix = input(this.#opt.autofix, { transform: booleanAttribute });
  readonly pattern = input(this.#opt.pattern);
  readonly showPlaceholder = input(this.#opt.showPlaceholder, { transform: booleanAttribute });
  readonly placeholderChar = input(this.#opt.placeholderChar);

  readonly valueChanges = this.#mask.valueChanges;

  constructor() {
    effect(() =>
      this.#mask.updateOptions({
        min: this.min(),
        max: this.max(),
        autofix: this.autofix(),
        pattern: this.pattern(),
        showPlaceholder: this.showPlaceholder(),
        placeholderChar: this.placeholderChar(),
      })
    );
  }

  setValue(value: Date | null): void {
    this.#mask.setValue(value);
  }

  onControlInit(el: HTMLElement): void {
    this.#mask.init(el);
  }

  onControlDestroy(): void {
    this.#mask.destroy();
  }

  protected onFocusIn(): void {
    this.#popover.toggle(true);
  }

  protected onFocusOut(e: FocusEvent): void {
    if (isElement(e.target) && e.target.matches('input') && !this.#mask.completed) {
      this.#mask.setValue(null);
    }
  }
}
