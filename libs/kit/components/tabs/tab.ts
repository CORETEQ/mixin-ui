import {
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'x-tab',
  template: `
    <ng-template>
      <ng-content />
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XTab {
  readonly template = viewChild.required(TemplateRef);
}
