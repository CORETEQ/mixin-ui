import { Component } from '@angular/core';
import { XListbox, XOption, XPopover, XSelect, XValue } from '@mixin-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-objects-example',
  imports: [XSelect, FormsModule, XPopover, XOption, XListbox, XValue],
  template: `
    <x-select placeholder="Select" key="value" [(ngModel)]="value">
      <span *x-value="let value" class="flex items-center gap-2">
        <span class="fi fi-{{value.value}}"></span>
        {{ value.label }}
      </span>

      <x-listbox *x-popover>
        @for (option of options; track option.value) {
          <x-option [value]="option">
            <span class="flex items-center gap-2">
              <span class="fi fi-{{option.value}}"></span>
              {{ option.label }}
            </span>
          </x-option>
        }
      </x-listbox>
    </x-select>
  `,
})
export class SelectObjectsExample {
  value = { value: 'us', label: 'United States' };
  options = [
    { value: 'us', label: 'United States' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'it', label: 'Italy' },
    { value: 'es', label: 'Spain' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'jp', label: 'Japan' },
    { value: 'br', label: 'Brazil' },
  ];
}
