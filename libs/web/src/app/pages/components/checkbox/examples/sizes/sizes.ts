import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckbox } from '@mixin-ui/kit';

@Component({
  selector: 'app-checkbox-sizes-example',
  imports: [XCheckbox, FormsModule],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <button x-checkbox size="sm"></button>
        <button x-checkbox size="md"></button>
        <button x-checkbox size="lg"></button>
      </div>

      <div class="flex items-center gap-4">
        <button x-checkbox size="sm" [ngModel]="true"></button>
        <button x-checkbox size="md" [ngModel]="true"></button>
        <button x-checkbox size="lg" [ngModel]="true"></button>
      </div>
    </div>
  `
})
export class SizesExample {}
