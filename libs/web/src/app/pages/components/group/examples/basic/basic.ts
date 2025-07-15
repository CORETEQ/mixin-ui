import { Component } from '@angular/core';
import { provideButtonOptions, XButton, XGroup, XIcon, XPopoverTarget, XTooltip } from '@mixin-ui/kit';

@Component({
  selector: 'app-group-basic-example',
  templateUrl: './basic.html',
  imports: [XGroup, XButton, XIcon, XTooltip, XPopoverTarget],
  providers: [provideButtonOptions({ variant: 'outline', color: 'gray' })],
})
export class GroupBasicExample {
  readonly active = new Set<string>();

  toggle(id: string) {
    if (this.active.has(id)) {
      this.active.delete(id);
    } else {
      this.active.add(id);
    }
  }
}
