@Component({
  template: `
    <textarea x-textarea [(ngModel)]="value"></textarea>
  `
})
export class Usage {
  readonly value = signal('');
}
