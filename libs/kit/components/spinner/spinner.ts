import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-spinner',
  styleUrl: './spinner.scss',
  template: '',
  host: {
    '[class]': '`x-spinner`',
  },
})
export class XSpinner {}
