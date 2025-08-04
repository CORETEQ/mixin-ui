import { Component } from '@angular/core';
import { XButton } from '@mixin-ui/kit';

@Component({
  selector: 'app-button-basic-example',
  imports: [XButton],
  template: `
    <button x-btn>Button</button>
  `
})
export class ButtonBasicExample {}
