import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { createCva } from '@mixin-ui/cdk';
import { X_SWITCH_OPTIONS } from './options';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'button[x-switch]',
  styleUrl: './switch.scss',
  templateUrl: './switch.html',
  imports: [],
  host: {
    type: 'button',
    role: 'switch',
    '[class]': '`x-switch x-size-${size()} x-radius-${radius()}`',
    '[class.x-checked]': 'checked()',
    '[attr.data-main-color]': 'color()',
    '(blur)': 'markAsTouched()',
    '(click)': 'toggle()',
  },
})
export class XSwitch {
  readonly #opt = inject(X_SWITCH_OPTIONS);
  readonly #ngc = inject(NgControl, { self: true, optional: true });
  readonly #cva = createCva({ defaultValue: false, transform: Boolean });

  readonly value = input<string>();
  readonly size = input(this.#opt.size);
  readonly radius = input(this.#opt.radius);
  readonly color = input(this.#opt.color);
  readonly checked = this.#cva.value;
  readonly required = this.#cva.required;

  constructor() {
    if (this.#ngc instanceof NgModel) {
      this.#ngc.control.setValidators(({ value }) =>
        this.required() && value !== true ? { required: true } : null
      );
    }
  }

  protected toggle(): void {
    this.#cva.updateValue(!this.checked());
  }

  protected markAsTouched(): void {
    this.#cva.markAsTouched();
  }
}
