import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckbox } from '@mixin-ui/kit';

@Component({
  selector: 'app-checkbox-radii-example',
  templateUrl: './radii.html',
  imports: [XCheckbox, FormsModule],
})
export class RadiiExample {}
