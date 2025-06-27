@Component({
  template: `
    <x-accordion>
      <x-accordion-item>
        Label
        <ng-template x-slot="content">
          Content
        </ng-template>
      </x-accordion-item>
    </x-accordion>
  `
})
export class Usage {}
