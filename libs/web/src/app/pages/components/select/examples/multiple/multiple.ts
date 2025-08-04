import { Component, signal } from '@angular/core';
import { XListbox, XOption, XPopover, XSelect } from '@mixin-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-multiple-example',
  imports: [XSelect, FormsModule, XPopover, XListbox, XOption],
  template: `
    <x-select placeholder="Multiple" multiple [(ngModel)]="value">
      <x-listbox *x-popover>
        @for (option of options(); track option) {
          <x-option [value]="option">
            {{ option }}
          </x-option>
        }
      </x-listbox>
    </x-select>
  `
})
export class SelectMultipleExample {
  readonly options = signal(['Angular', 'React', 'Vue', 'Svelte']);
  readonly value = signal(['Angular', 'React', 'Vue']);
}
