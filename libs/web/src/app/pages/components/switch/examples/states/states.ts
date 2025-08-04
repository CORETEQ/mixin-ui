import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XSwitch } from '@mixin-ui/kit';

@Component({
  selector: 'app-switch-states-example',
  imports: [XSwitch, ReactiveFormsModule, FormsModule],
  template: `
    <div class="flex flex-col items-center gap-4">
      <button x-switch disabled></button>
      <button x-switch disabled [ngModel]="true"></button>
      <button x-switch [formControl]="invalidFalse"></button>
    </div>
  `
})
export class StatesExample {
  invalidFalse = new FormControl(false, () => ({ invalid: true }));

  constructor() {
    this.invalidFalse.markAsTouched();
  }
}
