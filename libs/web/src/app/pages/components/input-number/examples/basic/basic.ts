import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XControl, XInputNumber } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-number-basic-example',
  templateUrl: './basic.html',
  imports: [FormsModule, XControl, XInputNumber],
})
export class InputNumberBasicExample {}
