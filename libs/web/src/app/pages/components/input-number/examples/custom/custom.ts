import { Component } from '@angular/core';
import { XButton, XControl, XIcon, XInputNumber } from '@mixin-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-number-custom-example',
  imports: [XControl, XInputNumber, FormsModule, XIcon, XButton],
  template: `
    <x-input-number #number
                    #input="x-input"
                    size="xl" radius="none" suffix=" mm" [step]="0">
      <span class="x-input-prefix">
        <x-icon src="package" size="18" />
      </span>

      <input x-control [ngModel]="0" />

      <span class="x-input-suffix gap-1 pr-1.5">
        <button x-btn
                size="sm"
                radius="none"
                color="warn"
                class="font-medium"
                [variant]="input.focused() ? 'subtle' : 'surface'"
                (click)="number.plus(5)">
          +5
        </button>

        <button x-btn
                size="sm"
                radius="none"
                color="error"
                class="font-medium"
                [variant]="input.focused() ? 'subtle' : 'surface'"
                (click)="number.plus(10)">
          +10
        </button>
      </span>
    </x-input-number>
  `
})
export class InputNumberCustomExample {}
