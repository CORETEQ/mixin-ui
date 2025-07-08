@Component({
  template: `
    <x-input-number>
      <input x-control [(ngModel)]="value">
    </x-input-number>
  `
})
export class Usage {
  readonly value = signal(0);
}
