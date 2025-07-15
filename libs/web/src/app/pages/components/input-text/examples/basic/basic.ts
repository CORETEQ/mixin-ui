import { Component } from '@angular/core';
import { XInputText } from '@mixin-ui/kit';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input-text-basic-example',
  templateUrl: './basic.html',
  imports: [XInputText, ReactiveFormsModule],
})
export class InputTextBasicExample {
  control = new FormControl('', { nonNullable: true });

  constructor() {
    this.control.events.pipe(takeUntilDestroyed()).subscribe(console.log);
  }
}
