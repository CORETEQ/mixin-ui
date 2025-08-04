import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XControl, XInputNumber } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-number-basic-example',
  imports: [FormsModule, XControl, XInputNumber],
  template: `
    <x-number prefix="$ ">
      <input x-control [ngModel]="1000000" />
    </x-number>
  `
})
export class InputNumberBasicExample {}
