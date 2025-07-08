import { Component } from '@angular/core';
import { XCalendar } from '@mixin-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar-basic-example',
  templateUrl: './basic.html',
  imports: [XCalendar, FormsModule],
})
export class CalendarBasicExample {
  value = new Date();
}
