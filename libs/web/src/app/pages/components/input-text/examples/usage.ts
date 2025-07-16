@Component({
  template: `
    <label x-label>
      Label
      <x-input-text>
        <input [(ngModel)]="value" />
      </x-input-text>
    </label>
  `
})
export class Usage {
  readonly value = signal('');
}
