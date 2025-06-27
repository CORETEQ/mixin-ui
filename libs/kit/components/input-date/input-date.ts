import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
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
import { XInput } from '@mixin-ui/kit/directives';
import { X_INPUT_DATE_OPTIONS } from './options';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-date',
  templateUrl: './input-date.html',
  providers: [provideMask(X_DATE_MASK_FACTORY)],
  hostDirectives: [
    {
      directive: XInput,
      inputs: ['variant', 'size', 'radius', 'color'],
    },
  ],
  host: {
    class: 'x-date',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class XDate {
  readonly #opt = inject(X_INPUT_DATE_OPTIONS);
  readonly #mask = injectMask<Date | null, XDateMaskOptions>();

  readonly min = input(this.#opt.min);
  readonly max = input(this.#opt.max);
  readonly autofix = input(this.#opt.autofix, { transform: booleanAttribute });
  readonly pattern = input(this.#opt.pattern);
  readonly showPlaceholder = input(this.#opt.showPlaceholder, { transform: booleanAttribute });
  readonly placeholderChar = input(this.#opt.placeholderChar);

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

  protected onFocusOut(e: FocusEvent): void {
    if (isElement(e.target) && e.target.matches('input') && !this.#mask.isComplete) {
      this.#mask.setValue(null);
    }
  }
}
