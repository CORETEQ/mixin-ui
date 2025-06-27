import { Component } from '@angular/core';
import { XButton, XTooltip } from '@mixin-ui/kit';

@Component({
  selector: 'app-tooltip-basic-example',
  templateUrl: './basic.html',
  imports: [XTooltip, XButton],
})
export class TooltipBasicExample {}
