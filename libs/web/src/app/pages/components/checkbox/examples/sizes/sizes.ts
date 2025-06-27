import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckbox } from '@mixin-ui/kit';

@Component({
  selector: 'app-checkbox-sizes-example',
  templateUrl: './sizes.html',
  imports: [XCheckbox, FormsModule],
})
export class SizesExample {}
