import { Component } from '@angular/core';
import { XButton, XControl, XIcon, XInputNumber } from '@mixin-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-number-custom-example',
  templateUrl: './custom.html',
  imports: [XControl, XInputNumber, FormsModule, XIcon, XButton],
})
export class InputNumberCustomExample {}
