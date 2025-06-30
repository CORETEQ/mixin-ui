import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { XInput } from '@mixin-ui/kit/directives';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-text',
  templateUrl: './root.html',
  hostDirectives: [
    {
      directive: XInput,
      inputs: ['variant', 'size', 'radius', 'color'],
    },
  ],
  host: { class: 'x-text' },
})
export class XText {}
