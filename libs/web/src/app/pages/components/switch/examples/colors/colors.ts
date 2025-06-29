import { Component } from '@angular/core';
import { XCheckbox, XSwitch } from '@mixin-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-switch-colors-example',
  templateUrl: './colors.html',
  imports: [FormsModule, XSwitch],
})
export class ColorsExample {}
