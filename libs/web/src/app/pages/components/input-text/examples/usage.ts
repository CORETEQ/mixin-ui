@Component({
  template: `
    <x-text>
      <input [(ngModel)]="value" />
    </x-text>
  `
})
export class Usage {
  readonly value = signal('');
}
