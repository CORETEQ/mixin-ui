import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { XInput } from '@mixin-ui/kit/directives';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-textarea',
  styleUrl: './textarea.scss',
  templateUrl: './textarea.html',
  hostDirectives: [
    {
      directive: XInput,
      inputs: ['variant', 'size', 'radius', 'color'],
    },
  ],
  host: {
    '[class]': '`x-textarea`',
  },
})
export class XTextarea {
  readonly placeholder = input<string>();
}
