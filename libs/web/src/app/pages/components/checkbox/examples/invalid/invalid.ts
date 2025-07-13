import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { XCheckbox } from '@mixin-ui/kit';

@Component({
  selector: 'app-checkbox-invalid-example',
  templateUrl: './invalid.html',
  imports: [XCheckbox, ReactiveFormsModule],
})
export class InvalidExample {
  invalidTrue = new FormControl(true, () => ({ invalid: true }));
  invalidFalse = new FormControl(false, () => ({ invalid: true }));

  constructor() {
    this.invalidTrue.markAsTouched();
    this.invalidFalse.markAsTouched();
  }
}
