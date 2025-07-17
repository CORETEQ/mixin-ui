import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

@Component({
  selector: 'app-input-text',
  templateUrl: './index.html',
  imports: [DocsPage],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Label {}
