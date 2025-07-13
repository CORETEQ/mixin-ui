@Component({
  template: `
    <x-combobox>
      <input x-control [(ngModel)]="value" />
      <x-listbox *x-popover>
        <x-option>Angular</x-option>
        <x-option>React</x-option>
        <x-option>Vue</x-option>
      </x-listbox>
    </x-combobox>
  `
})
export class Usage {
  readonly value = signal('');
}
