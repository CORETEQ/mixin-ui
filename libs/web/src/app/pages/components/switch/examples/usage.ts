@Component({
  template: `
    <button x-switch [(ngModel)]="value"></button>
  `
})
export class Usage {
  readonly value = signal(false);
}
