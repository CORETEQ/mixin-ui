import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XControl, XInputNumber } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-number-separators-example',
  imports: [FormsModule, XControl, XInputNumber],
  template: `
    <x-input-number thousandsSeparator="."
              decimalSeparator=","
              decimalScale="2"
              [step]="0">
      <input x-control [ngModel]="999999" />
    </x-input-number>
  `
})
export class InputNumberSeparatorsExample {}
