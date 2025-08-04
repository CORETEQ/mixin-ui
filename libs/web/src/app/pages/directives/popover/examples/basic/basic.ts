import { Component } from '@angular/core';
import { XButton, XPopoverTarget } from '@mixin-ui/kit';

@Component({
  selector: 'app-popover-basic-example',
  imports: [XPopoverTarget, XButton],
  template: `
    <button x-btn
            #popover="x-popover"
            x-popover-stretch="auto"
            x-popover-align="center"
            [x-popover-min-width]="300"
            [x-popover-max-width]="300"
            [x-popover]="content"
            (click)="popover.toggle(!popover.open())">
      Show popover
    </button>

    <ng-template #content>
      <div class="font-sm p-3">
        <span class="font-semibold">JavaScript</span> was originally called Mocha ☕
      </div>
    </ng-template>
  `
})
export class PopoverBasicExample {}
