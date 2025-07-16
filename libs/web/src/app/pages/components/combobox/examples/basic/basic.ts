import { Component, computed, signal } from '@angular/core';
import { XCombobox, XControl, XListbox, XOption, XPopover } from '@mixin-ui/kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-combobox-basic-example',
  templateUrl: './basic.html',
  imports: [
    XCombobox,
    XControl,
    XListbox,
    XPopover,
    XOption,
    FormsModule,
  ],
})
export class ComboboxBasicExample {
  readonly value = signal('Angular2');
  readonly query = signal('');
  readonly options = signal(['Angular', 'React', 'Vue']);

  readonly filteredOptions = computed(() => {
    const query = this.query();
    return this.options().filter(option => option.toLowerCase().includes(query.toLowerCase()));
  });
}
