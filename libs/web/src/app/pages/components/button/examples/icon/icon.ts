import { Component } from '@angular/core';
import { provideButtonOptions, XButton, XIcon } from '@mixin-ui/kit';

@Component({
  selector: 'app-button-icon-example',
  templateUrl: './icon.html',
  imports: [XButton, XIcon],
  providers: [provideButtonOptions({ color: 'gray', contrast: true })]
})
export class IconExample {}
