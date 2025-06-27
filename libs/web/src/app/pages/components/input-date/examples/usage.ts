@Component({
  template: `
    <x-date>
      <input x-control [(ngModel)]="value" />
      <x-calendar *x-popover />
    </x-date>
  `
})
export class Usage {
  readonly value = signal(new Date());
}
