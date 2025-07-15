import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { XInput } from '@mixin-ui/kit/directives';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-text',
  templateUrl: './input-text.html',
  hostDirectives: [
    {
      directive: XInput,
      inputs: ['variant', 'size', 'radius'],
    },
  ],
  host: { class: 'x-input-text' },
})
export class XInputText {}
