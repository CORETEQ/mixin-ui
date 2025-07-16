import { Component, signal } from '@angular/core';
import { XListbox, XOption } from '@mixin-ui/kit';

@Component({
  selector: 'app-frameworks',
  imports: [
    XListbox,
    XOption,
  ],
  template: `
    <x-listbox>
      @for (option of options(); track option) {
        <x-option [value]="option">
          {{ option }}
        </x-option>
      }
    </x-listbox>
  `,
})
export class Test {
  readonly options = signal(['Angular', 'React', 'Vue', 'Svelte']);
}
