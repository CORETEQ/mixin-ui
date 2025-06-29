import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { XInput } from '@mixin-ui/kit/directives';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'textarea[x-textarea]',
  styleUrl: './textarea.scss',
  templateUrl: './textarea.html',
  hostDirectives: [
    {
      directive: XInput,
      inputs: ['variant', 'size', 'radius', 'color'],
    },
  ],
  host: {
    class: 'x-textarea',
  },
})
export class XTextarea {}
