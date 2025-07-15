import { Component, signal } from '@angular/core';
import {XButton, XListbox, XOption, XPopover, XSelect} from '@mixin-ui/kit';

@Component({
  selector: 'app-select-popover-example',
  templateUrl: './popover.html',
  imports: [XButton, XSelect, XListbox, XPopover, XOption],
})
export class SelectPopoverExample {
  readonly sizes = [{
    value: 'SM',
    label: '50-53',
  }, {
    value: 'MD',
    label: '54-60',
  }, {
    value: 'LG',
    label: '61-65',
  }];
}
