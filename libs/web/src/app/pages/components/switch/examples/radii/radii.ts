import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSwitch } from '@mixin-ui/kit';

@Component({
  selector: 'app-switch-radii-example',
  templateUrl: './radii.html',
  imports: [XSwitch, FormsModule],
})
export class RadiiExample {}
