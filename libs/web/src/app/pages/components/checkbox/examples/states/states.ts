import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XCheckbox } from '@mixin-ui/kit';

@Component({
  selector: 'app-checkbox-states-example',
  imports: [XCheckbox, ReactiveFormsModule, FormsModule],
  template: `
    <div class="flex flex-col items-center gap-4">
      <button x-checkbox [formControl]="disabledFalse"></button>
      <button x-checkbox [formControl]="disabledTrue"></button>
      <button x-checkbox [formControl]="invalidFalse"></button>
    </div>
  `,
})
export class StatesExample {
  disabledFalse = new FormControl({ value: false, disabled: true });
  disabledTrue = new FormControl({ value: true, disabled: true });
  invalidFalse = new FormControl(false, () => ({ invalid: true }));

  constructor() {
    this.invalidFalse.markAsTouched();
  }
}
