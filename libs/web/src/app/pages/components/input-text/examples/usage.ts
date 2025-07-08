@Component({
  template: `
    <x-input-text>
      <input [(ngModel)]="value" />
    </x-input-text>
  `
})
export class Usage {
  readonly value = signal('');
}
