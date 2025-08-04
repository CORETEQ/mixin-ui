@Component({
  template: `
    <x-input-text>
      <input x-control [(ngModel)]="value" />
    </x-input-text>
  `
})
export class Usage {
  readonly value = signal('');
}
