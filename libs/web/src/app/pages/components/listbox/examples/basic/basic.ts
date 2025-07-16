import { Component } from '@angular/core';
import { XListbox, XOption } from '@mixin-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listbox-basic-example',
  templateUrl: './basic.html',
  imports: [
    XListbox,
    XOption,
    FormsModule,
  ],
})
export class InputTextBasicExample {}
