@Component({
  template: `
    <x-input-mask>
      <input x-control [(ngModel)]="value" />
    </x-input-mask>
  `
})
export class Usage {
  readonly value = signal('');
}
