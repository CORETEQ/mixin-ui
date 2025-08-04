import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSwitch } from '@mixin-ui/kit';

@Component({
  selector: 'app-switch-basic-example',
  imports: [XSwitch, FormsModule],
  template: `
    <div class="flex gap-3">
      <button x-switch [ngModel]="false"></button>
      <button x-switch [ngModel]="true"></button>
    </div>
  `
})
export class SwitchBasicExample {}
