import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XControl, XNumber } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-number-decimal-example',
  templateUrl: './decimal.html',
  imports: [FormsModule, XControl, XNumber],
})
export class InputNumberDecimalExample {}
