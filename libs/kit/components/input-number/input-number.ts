import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  numberAttribute,
  ViewEncapsulation,
} from '@angular/core';
import { injectMask, provideMask, X_NUMBER_MASK_FACTORY, XNumberMaskOptions } from '@mixin-ui/cdk';
import { provideControlAccessor, XControlAccessor, XInput } from '@mixin-ui/kit/directives';
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
    provideButtonOptions({ variant: 'outline', color: 'gray', radius: 'none' }),
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

  readonly disabled = computed(() => this.#input.state()?.disabled);
  readonly enabled = computed(
    () => !this.#input.state()?.disabled && !this.#input.state()?.readOnly
  );
  readonly plusDisabled = computed(() => !this.enabled() || this.normalizedValue >= this.max());
  readonly minusDisabled = computed(() => !this.enabled() || this.normalizedValue <= this.min());

  readonly valueChanges = this.#mask.valueChanges;

  constructor() {
    effect(() =>
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
      })
    );
  }

  get normalizedValue(): number {
    return this.#mask.modelValue || 0;
  }

  plus(step = 1): void {
    if (this.enabled()) {
      this.#mask.setValue(Math.min(this.max(), this.normalizedValue + step));
    }
  }

  minus(step = 1): void {
    if (this.enabled()) {
      this.#mask.setValue(Math.max(this.min(), this.normalizedValue - step));
    }
  }

  handleControlValue(value: number | null): void {
    this.#mask.setValue(value);
  }

  handleControlInit(el: HTMLInputElement): void {
    this.#mask.init(el);
  }

  handleControlDestroy(): void {
    this.#mask.destroy();
  }

  handleArrowUp(e: KeyboardEvent): void {
    if (this.step()) {
      e.preventDefault();
      this.plus(this.step());
    }
  }

  handleArrowDown(e: KeyboardEvent): void {
    if (this.step()) {
      e.preventDefault();
      this.minus(this.step());
    }
  }

  handleSpin(e: PointerEvent): void {
    e.preventDefault();
    this.#input.focus();
  }
}
