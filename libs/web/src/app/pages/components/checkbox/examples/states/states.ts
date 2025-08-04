import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XCheckbox } from '@mixin-ui/kit';

@Component({
  selector: 'app-checkbox-states-example',
  imports: [XCheckbox, ReactiveFormsModule, FormsModule],
  template: `
    <div class="flex flex-col items-center gap-4">
      <button x-checkbox disabled></button>
      <button x-checkbox disabled [ngModel]="true"></button>
      <button x-checkbox [formControl]="invalidFalse"></button>
    </div>
  `
})
export class StatesExample {
  invalidFalse = new FormControl(false, () => ({ invalid: true }));

  constructor() {
    this.invalidFalse.markAsTouched();
  }
}
