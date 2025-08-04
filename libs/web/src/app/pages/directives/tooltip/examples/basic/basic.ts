import { Component } from '@angular/core';
import { XButton, XTooltip } from '@mixin-ui/kit';

@Component({
  selector: 'app-tooltip-basic-example',
  imports: [XTooltip, XButton],
  template: `
    <div class="flex gap-3">
      <button x-btn
              x-tooltip="I love Mixin! ❤️">
        Hover to show
      </button>
      <button x-btn
              x-tooltip="I love Mixin! ❤️"
              x-tooltip-on="focus"
              variant="subtle">
        Focus to show
      </button>
    </div>
  `
})
export class TooltipBasicExample {}
