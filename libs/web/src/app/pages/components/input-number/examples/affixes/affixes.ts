import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XControl, XNumberRoot } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-number-affixes-example',
  templateUrl: './affixes.html',
  imports: [FormsModule, XControl, XNumberRoot],
})
export class InputNumberAffixesExample {}
