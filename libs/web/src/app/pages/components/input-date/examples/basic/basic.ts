import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { XCalendar, XControl, XInputDate, XPopover } from '@mixin-ui/kit';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input-date-basic-example',
  templateUrl: './basic.html',
  imports: [FormsModule, XControl, XInputDate, XCalendar, XPopover, ReactiveFormsModule],
})
export class InputDateBasicExample {
  readonly control = new FormControl(new Date(), { validators: Validators.required });

  constructor() {
    this.control.events.pipe(takeUntilDestroyed()).subscribe(console.log);
  }
}
