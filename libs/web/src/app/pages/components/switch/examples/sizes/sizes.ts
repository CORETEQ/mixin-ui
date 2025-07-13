import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSwitch } from '@mixin-ui/kit';

@Component({
  selector: 'app-switch-sizes-example',
  templateUrl: './sizes.html',
  imports: [XSwitch, FormsModule],
})
export class SizesExample {}
