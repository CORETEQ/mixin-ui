import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSwitch } from '@mixin-ui/kit';

@Component({
  selector: 'app-switch-sizes-example',
  imports: [XSwitch, FormsModule],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <button x-switch size="sm"></button>
        <button x-switch size="md"></button>
        <button x-switch size="lg"></button>
      </div>

      <div class="flex items-center gap-4">
        <button x-switch size="sm" [ngModel]="true"></button>
        <button x-switch size="md" [ngModel]="true"></button>
        <button x-switch size="lg" [ngModel]="true"></button>
      </div>
    </div>
  `
})
export class SizesExample {}
