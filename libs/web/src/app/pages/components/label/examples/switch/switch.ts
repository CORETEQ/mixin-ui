import { Component } from '@angular/core';
import { XLabel, XSwitch } from '@mixin-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-label-switch-example',
  templateUrl: './switch.html',
  imports: [XLabel, XSwitch, FormsModule],
})
export class LabelSwitchExample {}
