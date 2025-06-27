import { Component } from '@angular/core';
import { XCheckbox } from '@mixin-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-colors-example',
  templateUrl: './colors.html',
  imports: [XCheckbox, FormsModule],
})
export class ColorsExample {
}
