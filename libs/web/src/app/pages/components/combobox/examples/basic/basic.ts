import { Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { XCombobox, XControl, XListbox, XOption, XPopover } from '@mixin-ui/kit';

@Component({
  selector: 'app-combobox-basic-example',
  templateUrl: './basic.html',
  imports: [
    XCombobox,
    XControl,
    XListbox,
    XPopover,
    XOption,
    ReactiveFormsModule,
  ],
})
export class ComboboxBasicExample {
  readonly control = new FormControl('', { validators: Validators.required });

  readonly query = signal('');
  readonly options = signal(['Angular', 'React', 'Vue']);

  readonly filteredOptions = computed(() => {
    const query = this.query();
    return this.options().filter(option => option.toLowerCase().includes(query.toLowerCase()));
  });

  constructor() {
    this.control.events.pipe(takeUntilDestroyed()).subscribe(console.log);
  }
}
