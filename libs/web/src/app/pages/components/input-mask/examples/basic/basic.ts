import { Component } from '@angular/core';
import { XControl, XInputMask } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-mask-basic-example',
  templateUrl: './basic.html',
  imports: [XInputMask, XControl],
})
export class InputMaskBasicExample {}
