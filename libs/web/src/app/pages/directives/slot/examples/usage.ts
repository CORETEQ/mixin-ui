@Component({
  template: `
    <ng-template x-slot="name">
      <span>Content</span>
    </ng-template>

    <!-- or -->

    <span *x-slot="'name'">Content</span>
  `
})
export class Usage {}
