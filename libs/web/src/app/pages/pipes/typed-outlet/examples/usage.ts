@Component({
  template: `
    @let c = content() | typedOutlet;

    @if (c.type === 'component') {
      <ng-container *ngComponentOutlet="c.outlet" />
    } @else if (c.type === 'template') {
      <ng-container *ngTemplateOutlet="c.outlet" />
    } @else {
      {{ c.outlet }}
    }
  `
})
export class Usage {
  /**
   * XOutlet = Type | TemplateRef | string | null | undefined;
   */
  readonly content = input<XOutlet>();
}
