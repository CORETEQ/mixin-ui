import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  ViewEncapsulation,
} from '@angular/core';
import { injectMask, provideMask, X_NUMBER_MASK_FACTORY, XNumberMaskOptions } from '@mixin-ui/cdk';
import { XInput } from '@mixin-ui/kit/directives';
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
    provideButtonOptions({ variant: 'outline', color: 'gray', radius: 'none' }),
    provideMask(X_NUMBER_MASK_FACTORY),
  ],
  hostDirectives: [
    {
      directive: XInput,
      inputs: ['variant', 'size', 'radius', 'color'],
    },
  ],
  host: {
    class: 'x-number',
    '(keydown.arrowDown)': '$event.preventDefault(); step() && minus(step())',
    '(keydown.arrowUp)': '$event.preventDefault(); step() && plus(step())',
  },
})
export class XNumber {
  readonly #opt = inject(X_INPUT_NUMBER_OPTIONS);
  readonly #input = inject(XInput);
  readonly #mask = injectMask<number | null, XNumberMaskOptions>();

  readonly size = this.#input.size;
  readonly min = input(this.#opt.min);
  readonly max = input(this.#opt.max);
  readonly prefix = input(this.#opt.prefix);
  readonly suffix = input(this.#opt.suffix);
  readonly thousandsSeparator = input(this.#opt.thousandsSeparator);
  readonly decimalSeparator = input(this.#opt.decimalSeparator);
  readonly decimalScale = input(this.#opt.decimalScale, { transform: numberAttribute });
  readonly normalizeZeros = input(this.#opt.normalizeZeros, { transform: booleanAttribute });
  readonly padDecimals = input(this.#opt.padDecimals, { transform: booleanAttribute });
  readonly step = input(this.#opt.step, { transform: numberAttribute });
  readonly incrementIcon = input(this.#opt.incrementIcon);
  readonly decrementIcon = input(this.#opt.decrementIcon);
  readonly disabled = computed(() => this.#input.state()?.disabled);
  readonly enabled = computed(
    () => !this.#input.state()?.disabled && !this.#input.state()?.readOnly
  );
  readonly plusDisabled = computed(() => !this.enabled() || this.normalizedValue >= this.max());
  readonly minusDisabled = computed(() => !this.enabled() || this.normalizedValue <= this.min());

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
    return this.#mask.rawValue || 0;
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

  protected onSpin(e: PointerEvent): void {
    e.preventDefault();
    this.#input.focus();
  }
}
