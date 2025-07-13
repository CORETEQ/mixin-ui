import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSwitch } from '@mixin-ui/kit';

@Component({
  selector: 'app-switch-basic-example',
  templateUrl: './basic.html',
  imports: [XSwitch, FormsModule],
})
export class SwitchBasicExample {}
