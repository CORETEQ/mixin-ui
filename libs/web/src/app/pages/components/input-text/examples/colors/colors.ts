import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { XColor, XControl, XText } from '@mixin-ui/kit';

@Component({
  selector: 'app-input-text-colors-example',
  templateUrl: './colors.html',
  imports: [XControl, XText, TitleCasePipe],
})
export class InputTextColorExample {
  readonly colors: readonly XColor[] = [
    'purple',
    'orange',
    'green',
    'indigo',
    'blue',
    'red',
    'rose',
    'yellow',
    'pink',
    'gray',
  ];
}
