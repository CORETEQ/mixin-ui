import { Component } from '@angular/core';
import { provideButtonOptions, XButton } from '@mixin-ui/kit';

@Component({
  selector: 'app-button-colors-example',
  templateUrl: './colors.html',
  imports: [XButton],
  providers: [provideButtonOptions({ size: 'xs' })]
})
export class ColorsExample {}
