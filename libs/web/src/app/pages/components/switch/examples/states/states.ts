import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XSwitch } from '@mixin-ui/kit';

@Component({
  selector: 'app-switch-states-example',
  templateUrl: './states.html',
  imports: [XSwitch, ReactiveFormsModule, FormsModule],
})
export class StatesExample {
  invalidFalse = new FormControl(false, () => ({ invalid: true }));

  constructor() {
    this.invalidFalse.markAsTouched();
  }
}
