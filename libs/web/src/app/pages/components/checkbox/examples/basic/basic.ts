import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckbox } from '@mixin-ui/kit';

@Component({
  selector: 'app-checkbox-basic-example',
  imports: [XCheckbox, FormsModule],
  template: `
    <div class="flex gap-3">
      <button x-checkbox [ngModel]="false"></button>
      <button x-checkbox [indeterminate]="true" [ngModel]="false"></button>
      <button x-checkbox [ngModel]="true"></button>
    </div>
  `,
})
export class CheckboxBasicExample {}
