import { Component, effect, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XControl, XDate } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-date-basic-example',
  templateUrl: './basic.html',
  imports: [FormsModule, XControl, XDate, ReactiveFormsModule],
})
export class InputDateBasicExample {
  readonly date = signal(new Date());

  constructor() {
    effect(() => {
      console.log(this.date());
    });
  }
}
