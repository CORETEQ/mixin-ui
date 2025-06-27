@Component({
  template: `
    <button x-checkbox [(ngModel)]="value"></button>
  `
})
export class Usage {
  readonly value = signal(false);
}
