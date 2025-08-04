import { Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { XCombobox, XControl, XListbox, XOption, XPopover } from '@mixin-ui/kit';

@Component({
  selector: 'app-combobox-basic-example',
  imports: [ReactiveFormsModule, XCombobox, XControl, XListbox, XPopover, XOption],
  template: `
    <x-combobox>
      <input
        x-control
        placeholder="Start typing"
        [formControl]="control"
        (input)="query.set(el.value)"
        #el
      />
      <x-listbox *x-popover>
        @for (option of filteredOptions(); track option) {
          <x-option [disabled]="option === 'React'" [value]="option">
            {{ option }}
          </x-option>
        }
      </x-listbox>
    </x-combobox>
  `,
})
export class ComboboxBasicExample {
  readonly control = new FormControl('', { validators: Validators.required });

  readonly query = signal('');
  readonly options = signal([
    'Angular',
    'React',
    'Vue',
    'Svelte',
    'Qwick',
    'EmberJS',
    'AngularJS',
    'SolidJS',
    'Mol',
    'Preact',
    'Nuxt',
    'AnalogJS',
    'NextJS',
  ]);

  readonly filteredOptions = computed(() => {
    const query = this.query();
    return this.options().filter(option => option.toLowerCase().includes(query.toLowerCase()));
  });
}
