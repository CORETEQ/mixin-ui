import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { XInputBase } from '@mixin-ui/kit/directives';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-input-text',
  templateUrl: './input-text.html',
  hostDirectives: [
    {
      directive: XInputBase,
      inputs: ['variant', 'size', 'radius'],
    },
  ],
  host: {
    class: 'x-input-text',
  },
})
export class XInputText {}
