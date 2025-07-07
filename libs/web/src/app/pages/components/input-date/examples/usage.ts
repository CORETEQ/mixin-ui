@Component({
  template: `
    <x-input-date>
      <input x-control [(ngModel)]="value" />
      <x-calendar *x-popover />
    </x-input-date>
  `
})
export class Usage {
  readonly value = signal(new Date());
}
