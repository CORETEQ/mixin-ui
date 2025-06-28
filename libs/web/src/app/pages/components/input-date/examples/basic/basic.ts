import { Component, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCalendar, XControl, XDate, XPopoverContent } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-date-basic-example',
  templateUrl: './basic.html',
  imports: [FormsModule, XControl, XDate, XCalendar, XPopoverContent],
})
export class InputDateBasicExample {
  readonly date = signal(new Date());

  constructor() {
    effect(() => {
      console.log(this.date());
    });
  }
}
