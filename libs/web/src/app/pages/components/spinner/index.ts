import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import basicTs from './examples/basic/basic?raw&lang=ts';
import { SpinnerBasicExample } from './examples/basic/basic';

@Component({
  selector: 'app-spinner',
  templateUrl: './index.html',
  imports: [DocsPage, SpinnerBasicExample],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Spinner {
  imp = imp;
  usage = usage;
  basicTs = basicTs;
}
