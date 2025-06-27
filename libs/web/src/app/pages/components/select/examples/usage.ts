@Component({
  template: `
    <x-select [(ngModel)]="value">
      <x-listbox *x-popover>
        @for (option of options(); track option) {
          <x-option [value]="option">{{ option }}</x-option>
        }
      </x-listbox>
    </x-select>
  `
})
export class Usage {
  readonly options = signal([1, 2, 3, 4, 5]);
  readonly value = signal(1);
}
