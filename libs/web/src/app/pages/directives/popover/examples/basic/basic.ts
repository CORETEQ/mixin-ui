import { Component } from '@angular/core';
import { XButton, XPopoverTarget } from '@mixin-ui/kit';

@Component({
  selector: 'app-popover-basic-example',
  templateUrl: './basic.html',
  imports: [XPopoverTarget, XButton],
})
export class PopoverBasicExample {}
