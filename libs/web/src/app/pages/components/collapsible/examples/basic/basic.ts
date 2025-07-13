import { Component, signal } from '@angular/core';
import { XButton, XCollapsible, XIcon } from '@mixin-ui/kit';

@Component({
  selector: 'app-collapsible-basic-example',
  templateUrl: './basic.html',
  imports: [XCollapsible, XButton, XIcon],
})
export class CollapsibleBasicExample {
  readonly open = signal(false);
}
