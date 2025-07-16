@Component({
  template: `
    <x-combobox>
      <input x-control [(ngModel)]="value" (input)="query.set(el.value)" #el />
      <x-listbox *x-popover>
        @for(option of filteredOptions(); track option) {
          <x-option [value]="option">
            {{ option }}
          </x-option>
        }
      </x-listbox>
    </x-combobox>
  `
})
export class Usage {
  readonly value = signal('');
  readonly query = signal('');
  readonly options = signal(['Angular', 'React', 'Vue']);

  readonly filteredOptions = computed(() => {
    const query = this.query();
    return this.options().filter(option => option.includes(query));
  });
}
