import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  numberAttribute,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { injectMask, provideMask, X_NUMBER_MASK_FACTORY, XNumberMaskOptions } from '@mixin-ui/cdk';
import {
  provideControlAccessor,
  XControl,
  XControlAccessor,
  XInput,
} from '@mixin-ui/kit/directives';
import { XIcon } from '@mixin-ui/kit/components/icon';
import { XGroup } from '@mixin-ui/kit/components/group';
import { provideButtonOptions, XButton } from '@mixin-ui/kit/components/button';
import { X_INPUT_NUMBER_OPTIONS } from './options';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-number',
  templateUrl: './input-number.html',
  imports: [XButton, XIcon, XGroup],
  providers: [
    provideMask(X_NUMBER_MASK_FACTORY),
    provideControlAccessor(forwardRef(() => XInputNumber)),
    provideButtonOptions({ variant: 'outline', color: 'neutral', radius: 'none' }),
  ],
  hostDirectives: [
    {
      directive: XInput,
      inputs: ['variant', 'size', 'radius'],
    },
  ],
  host: {
    class: 'x-input-number',
    '(keydown.arrowUp)': 'handleArrowUp($event)',
    '(keydown.arrowDown)': 'handleArrowDown($event)',
  },
})
export class XInputNumber implements XControlAccessor<number | null> {
  readonly #opt = inject(X_INPUT_NUMBER_OPTIONS);
  readonly #input = inject(XInput);
  readonly #mask = injectMask<number | null, XNumberMaskOptions>();
  readonly #r2 = inject(Renderer2);

  readonly input = contentChild.required(XControl, { read: ElementRef });
  readonly size = this.#input.size;

  /** Minimum allowed value */
  readonly min = input(this.#opt.min);

  /** Maximum allowed value */
  readonly max = input(this.#opt.max);

  /** Text prefix (e.g., "$") */
  readonly prefix = input(this.#opt.prefix);

  /** Text suffix (e.g., "%") */
  readonly suffix = input(this.#opt.suffix);

  /** Thousands separator character */
  readonly thousandsSeparator = input(this.#opt.thousandsSeparator);

  /** Decimal separator character */
  readonly decimalSeparator = input(this.#opt.decimalSeparator);

  /** Number of decimal places to display */
  readonly decimalScale = input(this.#opt.decimalScale, { transform: numberAttribute });

  /** Remove leading zeros (000123 → 123) */
  readonly normalizeZeros = input(this.#opt.normalizeZeros, { transform: booleanAttribute });

  /** Add trailing zeros to match decimalScale (12.5 → 12.50) */
  readonly padDecimals = input(this.#opt.padDecimals, { transform: booleanAttribute });

  /** Step value for incrementing/decrementing the number (default is 1) */
  readonly step = input(this.#opt.step, { transform: numberAttribute });

  readonly disabled = computed(
    () => this.#input.state()?.disabled || this.#input.state()?.readOnly
  );
  readonly plusDisabled = computed(() => this.disabled() || this.normalizedValue >= this.max());
  readonly minusDisabled = computed(() => this.disabled() || this.normalizedValue <= this.min());

  readonly valueChanges = this.#mask.valueChanges;

  constructor() {
    effect(() => {
      this.#mask.init(this.input().nativeElement);
    });

    effect(() => {
      this.#mask.updateOptions({
        min: this.min(),
        max: this.max(),
        prefix: this.prefix(),
        suffix: this.suffix(),
        thousandsSeparator: this.thousandsSeparator(),
        decimalSeparator: this.decimalSeparator(),
        decimalScale: this.decimalScale(),
        normalizeZeros: this.normalizeZeros(),
        padDecimals: this.padDecimals(),
      });
    });

    effect(() => {
      const input = this.input().nativeElement;
      const mode = this.decimalScale() ? 'decimal' : 'numeric';

      this.#r2.setProperty(input, 'role', 'spinbutton');
      this.#r2.setProperty(input, 'autocomplete', 'off');
      this.#r2.setProperty(input, 'autocorrect', 'off');
      this.#r2.setProperty(input, 'inputMode', mode);
    });
  }

  get normalizedValue(): number {
    return this.#mask.modelValue || 0;
  }

  plus(step = 1): void {
    if (!this.disabled()) {
      this.#mask.setValue(Math.min(this.max(), this.normalizedValue + step));
    }
  }

  minus(step = 1): void {
    if (!this.disabled()) {
      this.#mask.setValue(Math.max(this.min(), this.normalizedValue - step));
    }
  }

  /** @internal */
  handleArrowUp(e: KeyboardEvent): void {
    if (this.step()) {
      e.preventDefault();
      this.plus(this.step());
    }
  }

  /** @internal */
  handleArrowDown(e: KeyboardEvent): void {
    if (this.step()) {
      e.preventDefault();
      this.minus(this.step());
    }
  }

  /** @internal */
  handleSpin(e: PointerEvent): void {
    e.preventDefault();
    this.#input.focus();
  }

  /** @internal */
  handleControlValue(value: number | null): void {
    this.#mask.setValue(value);
  }
}
