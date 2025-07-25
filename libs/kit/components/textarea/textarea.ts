import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { XInputBase } from '@mixin-ui/kit/directives';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'textarea[x-textarea]',
  styleUrl: './textarea.scss',
  templateUrl: './textarea.html',
  hostDirectives: [
    {
      directive: XInputBase,
      inputs: ['variant', 'size', 'radius'],
    },
  ],
  host: {
    class: 'x-textarea',
  },
})
export class XTextarea {}
