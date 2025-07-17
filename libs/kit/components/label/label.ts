import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'label[x-label]',
  styleUrl: './label.scss',
  templateUrl: './label.html',
  host: {
    class: 'x-label',
  },
})
export class XLabel {}
