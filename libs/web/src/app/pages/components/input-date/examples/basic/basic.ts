import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCalendar, XControl, XInputDate, XPopover } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-date-basic-example',
  templateUrl: './basic.html',
  imports: [FormsModule, XControl, XInputDate, XCalendar, XPopover],
})
export class InputDateBasicExample {
  readonly date = signal(new Date());
}
