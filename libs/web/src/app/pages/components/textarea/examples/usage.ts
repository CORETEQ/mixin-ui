@Component({
  template: `
    <x-textarea>
      <textarea x-control [(ngModel)]="value"></textarea>
    </x-textarea>
  `
})
export class Usage {
  readonly value = signal('');
}
