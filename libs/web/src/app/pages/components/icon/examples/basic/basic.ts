import { Component } from '@angular/core';
import { XIcon } from '@mixin-ui/kit';

@Component({
  selector: 'app-icon-basic-example',
  imports: [XIcon],
  template: `
    <x-icon src="sun" size="24" />
  `
})
export class IconBasicExample {}
