import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckbox } from '@mixin-ui/kit';

@Component({
  selector: 'app-checkbox-radii-example',
  imports: [XCheckbox, FormsModule],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <button x-checkbox radius="none"></button>
        <button x-checkbox radius="sm"></button>
        <button x-checkbox radius="md"></button>
        <button x-checkbox radius="lg"></button>
        <button x-checkbox radius="full"></button>
      </div>

      <div class="flex items-center gap-4">
        <button x-checkbox radius="none" [ngModel]="true"></button>
        <button x-checkbox radius="sm" [ngModel]="true"></button>
        <button x-checkbox radius="md" [ngModel]="true"></button>
        <button x-checkbox radius="lg" [ngModel]="true"></button>
        <button x-checkbox radius="full" [ngModel]="true"></button>
      </div>
    </div>
  `
})
export class RadiiExample {}
