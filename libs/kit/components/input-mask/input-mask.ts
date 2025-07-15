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
  X_PATTERN_MASK_FACTORY,
  XPatternMaskOptions,
} from '@mixin-ui/cdk';
import { provideControlAccessor, XControlAccessor, XInput } from '@mixin-ui/kit/directives';
import { X_INPUT_MASK_OPTIONS } from './options';
import { merge, Subject } from 'rxjs';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-input-mask',
  templateUrl: './input-mask.html',
  providers: [
    provideMask(X_PATTERN_MASK_FACTORY),
    provideControlAccessor(forwardRef(() => XInputMask)),
  ],
  hostDirectives: [
    {
      directive: XInput,
      inputs: ['variant', 'size', 'radius'],
    },
  ],
  host: {
    class: 'x-input-mask',
    '(focusout)': 'handleFocusOut($event)',
  },
})
export class XInputMask implements XControlAccessor<string> {
  readonly #opt = inject(X_INPUT_MASK_OPTIONS);
  readonly #mask = injectMask<string, XPatternMaskOptions>();
  readonly #innerValueChanges = new Subject<string>();

  readonly pattern = input(this.#opt.pattern);
  readonly showFiller = input(this.#opt.showFiller, { transform: booleanAttribute });
  readonly fillerChar = input(this.#opt.fillerChar);
  readonly resetUncompleted = input(this.#opt.resetUncompleted, { transform: booleanAttribute });

  readonly valueChanges = merge(this.#mask.valueChanges, this.#innerValueChanges);

  constructor() {
    effect(() => {
      this.#mask.updateOptions({
        pattern: this.pattern(),
        showFiller: this.showFiller(),
        fillerChar: this.fillerChar(),
      });
    });
  }

  handleFocusOut(e: FocusEvent): void {
    if (
      this.resetUncompleted() &&
      !this.#mask.completed &&
      isElement(e.target) &&
      e.target.matches('input')
    ) {
      this.#mask.setValue('');
      this.#innerValueChanges.next('');
    }
  }

  handleControlValue(value: string): void {
    this.#mask.setValue(value);
  }

  handleControlInit(el: HTMLInputElement): void {
    this.#mask.init(el);
  }

  handleControlDestroy(): void {
    this.#mask.destroy();
  }
}
