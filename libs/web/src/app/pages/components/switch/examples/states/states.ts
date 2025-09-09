import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { XSwitch } from '@mixin-ui/kit';

@Component({
  selector: 'app-switch-states-example',
  imports: [XSwitch, ReactiveFormsModule],
  template: `
    <div class="flex flex-col items-center gap-4">
      <button x-switch [formControl]="disabledFalse"></button>
      <button x-switch [formControl]="disabledTrue"></button>
      <button x-switch [formControl]="invalidFalse"></button>
    </div>
  `
})
export class StatesExample {
  disabledFalse = new FormControl({ value: false, disabled: true });
  disabledTrue = new FormControl({ value: true, disabled: true });
  invalidFalse = new FormControl(false, () => ({ invalid: true }));

  constructor() {
    this.invalidFalse.markAsTouched();
  }
}
