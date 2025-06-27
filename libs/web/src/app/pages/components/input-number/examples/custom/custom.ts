import { Component } from '@angular/core';
import { XButton, XControl, XIcon, XNumber } from '@mixin-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-number-custom-example',
  templateUrl: './custom.html',
  imports: [XControl, XNumber, FormsModule, XIcon, XButton],
})
export class InputNumberCustomExample {}
