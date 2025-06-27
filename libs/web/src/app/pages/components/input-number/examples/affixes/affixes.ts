import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XControl, XNumber } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-number-affixes-example',
  templateUrl: './affixes.html',
  imports: [FormsModule, XControl, XNumber],
})
export class InputNumberAffixesExample {}
