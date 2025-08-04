import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XListbox, XOption, XPopover, XSelect } from '@mixin-ui/kit';

@Component({
  selector: 'app-select-basic-example',
  imports: [FormsModule, XSelect, XPopover, XListbox, XOption],
  template: `
    <x-select placeholder="Select option" [(ngModel)]="value">
      <x-listbox *x-popover>
        @for (option of options(); track option) {
          <x-option [value]="option">
            {{ option }}
          </x-option>
        }
      </x-listbox>
    </x-select>
  `,
})
export class SelectBasicExample {
  readonly options = signal(['Angular', 'React', 'Vue', 'Svelte']);
  readonly value = signal(null);
}
