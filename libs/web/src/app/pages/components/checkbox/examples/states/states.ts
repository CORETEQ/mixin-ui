import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XCheckbox } from '@mixin-ui/kit';

@Component({
  selector: 'app-checkbox-states-example',
  templateUrl: './states.html',
  imports: [XCheckbox, ReactiveFormsModule, FormsModule],
})
export class StatesExample {
  invalidFalse = new FormControl(false, () => ({ invalid: true }));

  constructor() {
    this.invalidFalse.markAsTouched();
  }
}
