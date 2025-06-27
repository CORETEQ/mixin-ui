@Component({
  template: `
    <x-mask>
      <input x-control [(ngModel)]="value" />
    </x-mask>
  `
})
export class Usage {
  readonly value = signal('');
}
