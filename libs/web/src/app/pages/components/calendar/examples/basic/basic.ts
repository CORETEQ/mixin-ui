import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCalendar } from '@mixin-ui/kit';

@Component({
  selector: 'app-calendar-basic-example',
  imports: [XCalendar, FormsModule],
  styles: `
    .x-calendar {
      border-radius: 0.5rem;
      border: 1px solid var(--x-neutral-200);
    }
  `,
  template: `
    <x-calendar [(ngModel)]="value" /> <!-- [!spotlight] -->
  `,
})
export class CalendarBasicExample {
  value = new Date();
}
