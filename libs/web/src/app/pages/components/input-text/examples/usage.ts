@Component({
  template: `
    <x-control>
      Label
      <x-input-text>
        <input x-model [(ngModel)]="value" />
      </x-input-text>
      <x-error>Error message</x-error>
    </x-control>

    <x-control>
      <button x-switch></button>
      Label
    </x-control>

    <x-control>
      <button x-checkbox></button>
      Label
    </x-control>
  `
})
export class Usage {
  readonly value = signal('');
}
