import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { XControl, XNumber } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-number-states-example',
  templateUrl: './states.html',
  imports: [FormsModule, XControl, XNumber, ReactiveFormsModule],
})
export class InputNumberStatesExample {
  formControl = new FormControl(null, { validators: Validators.required });

  constructor() {
    this.formControl.markAsTouched();
  }
}
