import { Component, signal } from '@angular/core';
import { XButton, XSelect } from '@mixin-ui/kit';

@Component({
  selector: 'app-select-popover-example',
  templateUrl: './popover.html',
  imports: [XButton, XSelect],
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
