import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XControl, XInputNumber } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-number-affixes-example',
  imports: [FormsModule, XControl, XInputNumber],
  template: `
    <x-number prefix="~ " suffix=" °F" [step]="0">
      <input x-control [ngModel]="1000" />
    </x-number>
  `
})
export class InputNumberAffixesExample {}
