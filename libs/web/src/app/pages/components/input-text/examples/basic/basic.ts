import { Component } from '@angular/core';
import { XInputText } from '@mixin-ui/kit';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-text-basic-example',
  imports: [XInputText, ReactiveFormsModule],
  template: `
    <x-input-text>
      <input placeholder="Type here" [formControl]="control" />
    </x-input-text>
  `,
})
export class InputTextBasicExample {
  control = new FormControl('', { nonNullable: true });
}
