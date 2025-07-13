import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckbox } from '@mixin-ui/kit';

@Component({
  selector: 'app-checkbox-basic-example',
  templateUrl: './basic.html',
  imports: [XCheckbox, FormsModule],
})
export class CheckboxBasicExample {}
