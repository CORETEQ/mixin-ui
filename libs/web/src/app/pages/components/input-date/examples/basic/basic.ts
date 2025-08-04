import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { XCalendar, XControl, XInputDate, XPopover } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-date-basic-example',
  imports: [XControl, XInputDate, XCalendar, XPopover, ReactiveFormsModule],
  template: `
    <x-input-date>
      <input x-control [formControl]="control" />
      <x-calendar *x-popover />
    </x-input-date>
  `,
})
export class InputDateBasicExample {
  readonly control = new FormControl(new Date(), {
    validators: Validators.required,
  });
}
