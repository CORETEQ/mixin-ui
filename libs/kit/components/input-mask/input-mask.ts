import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import {
  injectMask,
  isMatchingTarget,
  observe,
  provideMask,
  X_PATTERN_MASK_FACTORY,
  XPatternMaskOptions,
} from '@mixin-ui/cdk';
import {
  provideControlAccessor,
  XControl,
  XControlAccessor,
  XInputBase,
} from '@mixin-ui/kit/directives';
import { X_INPUT_MASK_OPTIONS } from './options';

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
      directive: XInputBase,
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
  readonly #reset = new Subject<''>();

  readonly input = contentChild.required(XControl, { read: ElementRef });
  readonly pattern = input(this.#opt.pattern);
  readonly showFiller = input(this.#opt.showFiller, { transform: booleanAttribute });
  readonly fillerChar = input(this.#opt.fillerChar);
  readonly strict = input(this.#opt.strict, { transform: booleanAttribute });

  readonly valueChanges = merge(this.#mask.valueChanges, this.#reset);

  constructor() {
    effect(() => {
      this.#mask.init(this.input().nativeElement);
    });

    effect(() => {
      this.#mask.updateOptions({
        pattern: this.pattern(),
        showFiller: this.showFiller(),
        fillerChar: this.fillerChar(),
      });
    });

    observe(this.#reset, value => {
      this.#mask.setValue(value);
    });
  }

  /** @internal */
  handleFocusOut(e: FocusEvent): void {
    if (
      isMatchingTarget(e, 'input') &&
      this.strict() &&
      this.#mask.rawValue !== '' &&
      !this.#mask.completed
    ) {
      this.#reset.next('');
    }
  }

  /** @internal */
  handleControlValue(value: string): void {
    this.#mask.setValue(value);
  }
}
