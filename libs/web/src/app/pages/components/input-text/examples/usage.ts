@Component({
  template: `
    <x-text>
      <input x-control [(ngModel)]="value" />
    </x-text>
  `
})
export class Usage {
  readonly value = signal('');
}
