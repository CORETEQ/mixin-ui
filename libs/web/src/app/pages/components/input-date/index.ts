import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import { InputDateBasicExample } from './examples/basic/basic';

@Component({
  selector: 'app-input-date',
  templateUrl: './index.html',
  imports: [DocsPage, InputDateBasicExample],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputDate {
  imp = imp;
  usage = usage;
}
