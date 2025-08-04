import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { XControl, XInputNumber } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-number-states-example',
  imports: [FormsModule, XControl, XInputNumber, ReactiveFormsModule],
  template: `
    <div class="flex gap-3">
      <div class="flex flex-col flex-1 gap-1">
        <label for="readonly" class="text-sm font-medium">Readonly</label>
        <x-number [step]="0">
          <input x-control
                 readonly
                 id="readonly"
                 [ngModel]="1000" />
        </x-number>
      </div>

      <div class="flex flex-col flex-1 gap-1">
        <label for="disabled" class="text-sm font-medium">Disabled</label>
        <x-number [step]="0">
          <input x-control
                 disabled
                 id="disabled"
                 [ngModel]="1000" />
        </x-number>
      </div>

      <div class="flex flex-col flex-1 gap-1">
        <label for="invalid" class="text-sm font-medium">Invalid</label>
        <x-number [step]="0">
          <input x-control
                 id="invalid"
                 placeholder="XXX"
                 [formControl]="formControl" />
        </x-number>
      </div>
    </div>
  `
})
export class InputNumberStatesExample {
  formControl = new FormControl(null, { validators: Validators.required });

  constructor() {
    this.formControl.markAsTouched();
  }
}
