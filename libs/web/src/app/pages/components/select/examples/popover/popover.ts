import { Component, signal } from '@angular/core';
import {XButton, XListbox, XOption, XPopover, XSelect} from '@mixin-ui/kit';

@Component({
  selector: 'app-select-popover-example',
  imports: [XButton, XSelect, XListbox, XPopover, XOption],
  template: `
    <div class="flex gap-3">
      <button x-btn (click)="popover.toggle(true)">
        {{ popover.open() ? 'Popover is open' : 'Open popover' }}
      </button>

      <x-select #popover="x-popover"
                class="w-[10rem]"
                placeholder="Size"
                popoverWidth="auto"
                [popoverMinWidth]="200"
      >
        <x-listbox *x-popover>
          @for (option of sizes; track option.value) {
            <x-option [value]="option.value">
              <div class="flex justify-between items-center w-full">
                {{ option.label }}
                <span class="font-medium">{{ option.value }}</span>
              </div>
            </x-option>
          }
        </x-listbox>
      </x-select>
    </div>
  `
})
export class SelectPopoverExample {
  readonly sizes = [{
    value: 'SM',
    label: '50-53',
  }, {
    value: 'MD',
    label: '54-60',
  }, {
    value: 'LG',
    label: '61-65',
  }];
}
