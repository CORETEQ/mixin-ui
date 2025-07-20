import { Component, signal } from '@angular/core';
import { XControl, XInputMask } from '@mixin-ui/kit';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input-mask-basic-example',
  templateUrl: './basic.html',
  imports: [XInputMask, XControl, ReactiveFormsModule],
})
export class InputMaskBasicExample {
  readonly control = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  readonly pattern = signal('+{421} 000 000 000');

  constructor() {
    this.control.events.pipe(takeUntilDestroyed()).subscribe(console.log);
  }
}
