import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCalendar, XSlot } from '@mixin-ui/kit';

@Component({
  selector: 'app-calendar-basic-example',
  templateUrl: './basic.html',
  imports: [XCalendar, FormsModule, XSlot],
})
export class CalendarBasicExample {
  value = new Date();
}
