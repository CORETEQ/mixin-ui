import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XControl, XInputNumber } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-number-decimal-example',
  imports: [FormsModule, XControl, XInputNumber],
  template: `
    <div class="flex gap-3">
      <div class="flex flex-col flex-1 gap-1">
        <label for="with-fraction" class="text-sm font-medium">With fractional part</label>
        <x-input-number decimalScale="2"
                  [step]="0">
          <input x-control id="with-fraction" [ngModel]="3.00" />
        </x-input-number>
      </div>

      <div class="flex flex-col flex-1 gap-1">
        <label for="without-fraction" class="text-sm font-medium">Without fractional part</label>
        <x-input-number decimalScale="2"
                  [padDecimals]="false"
                  [step]="0">
          <input x-control id="without-fraction" [ngModel]="3.00" />
        </x-input-number>
      </div>

      <div class="flex flex-col flex-1 gap-1">
        <label for="with-separator" class="text-sm font-medium">Custom separator</label>
        <x-input-number decimalSeparator="."
                  decimalScale="2"
                  [step]="0">
          <input x-control id="with-separator" [ngModel]="3.14" />
        </x-input-number>
      </div>
    </div>
  `
})
export class InputNumberDecimalExample {}
