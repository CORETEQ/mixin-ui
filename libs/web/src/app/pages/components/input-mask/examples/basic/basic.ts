import { Component } from '@angular/core';
import { XControl, XInputMask } from '@mixin-ui/kit';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-mask-basic-example',
  imports: [XInputMask, XControl, ReactiveFormsModule],
  template: `
    <x-input-mask pattern="+{421} 000 000 000">
      <input x-control placeholder="Type here" [formControl]="control" />
    </x-input-mask>
  `,
})
export class InputMaskBasicExample {
  readonly control = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
}
