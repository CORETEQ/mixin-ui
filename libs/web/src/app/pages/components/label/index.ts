import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import { LabelBasicExample } from './examples/basic/basic';

@Component({
  selector: 'app-input-text',
  templateUrl: './index.html',
  imports: [DocsPage, LabelBasicExample],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Label {
  protected readonly imp = imp;
  protected readonly usage = usage;
}
