import { Component } from '@angular/core';
import { XButton, XPopover } from '@mixin-ui/kit';

@Component({
  selector: 'app-popover-basic-example',
  templateUrl: './basic.html',
  imports: [XPopover, XButton],
})
export class PopoverBasicExample {}
