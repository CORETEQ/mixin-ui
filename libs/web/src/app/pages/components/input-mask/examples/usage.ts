@Component({
  template: `
    <x-input-mask pattern="+{421} 000 000 000">
      <input x-control [(ngModel)]="value" />
    </x-input-mask>
  `
})
export class Usage {
  readonly value = signal('');
}
