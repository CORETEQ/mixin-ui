import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-spinner',
  styleUrl: './spinner.scss',
  host: {
    '[class]': '`x-spinner`',
  },
  template: '',
})
export class XSpinner {}
