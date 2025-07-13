@Component({
  template: `
    <x-collapsible [open]="open()">
      Content
    </x-collapsible>
  `
})
export class Usage {
  readonly open = signal(false);
}
