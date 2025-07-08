import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { createCva } from '@mixin-ui/cdk';
import { XIcon } from '@mixin-ui/kit/components/icon';
import { X_CHECKBOX_OPTIONS } from './options';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'button[x-checkbox]',
  styleUrl: './checkbox.scss',
  templateUrl: './checkbox.html',
  imports: [XIcon],
  host: {
    type: 'button',
    role: 'checkbox',
    '[class]': '`x-checkbox x-size-${size()} x-radius-${radius()}`',
    '[attr.data-state]': 'state()',
    '[attr.aria-checked]': 'ariaChecked()',
    '[attr.aria-required]': 'required()',
    '[attr.value]': 'value()',
    '(blur)': 'markAsTouched()',
    '(click)': 'toggle()',
  },
})
export class XCheckbox {
  readonly #opt = inject(X_CHECKBOX_OPTIONS);
  readonly #ngc = inject(NgControl, { self: true, optional: true });
  readonly #cva = createCva({ defaultValue: false, transform: Boolean });

  readonly value = input<string>();
  readonly indeterminate = model(false);
  readonly size = input(this.#opt.size);
  readonly radius = input(this.#opt.radius);
  readonly checked = this.#cva.value;
  readonly required = this.#cva.required;
  readonly ariaChecked = computed(() => (this.indeterminate() ? 'mixed' : String(this.checked())));

  readonly state = computed(() =>
    this.indeterminate() ? 'indeterminate' : this.checked() ? 'checked' : 'unchecked'
  );

  readonly icon = computed(() =>
    this.indeterminate()
      ? this.#opt.iconIndeterminate
      : this.checked()
      ? this.#opt.iconChecked
      : null
  );

  constructor() {
    if (this.#ngc instanceof NgModel) {
      this.#ngc.control.setValidators(({ value }) =>
        this.required() && value !== true ? { required: true } : null
      );
    }
  }

  protected toggle(): void {
    this.indeterminate.set(false);
    this.#cva.updateValue(!this.checked());
  }

  protected markAsTouched(): void {
    this.#cva.markAsTouched();
  }
}
