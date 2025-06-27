import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CdkMenu } from '@angular/cdk/menu';
import { provideFocusMonitor } from '@mixin-ui/cdk';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  providers: [provideFocusMonitor()],
  hostDirectives: [CdkMenu],
  host: {
    class: 'x-menu',
  },
})
export class XMenu {
  readonly #menu = inject(CdkMenu);
}
