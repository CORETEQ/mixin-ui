@Component({
  template: `
    <x-number>
      <input x-control [(ngModel)]="value">
    </x-number>
  `
})
export class Usage {
  readonly value = signal(0);
}
