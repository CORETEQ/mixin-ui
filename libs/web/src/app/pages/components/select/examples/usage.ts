@Component({
  template: `
    <x-select [(ngModel)]="value">
      <x-listbox *x-popover>
        <x-option value="ng">Angular</x-option>
      </x-listbox>
    </x-select>
  `
})
export class Usage {}
