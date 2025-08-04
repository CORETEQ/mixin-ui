import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import basicTs from './examples/basic/basic?raw&lang=ts';
import { CollapsibleBasicExample } from './examples/basic/basic';

@Component({
  selector: 'app-collapsible',
  templateUrl: './index.html',
  imports: [DocsPage, CollapsibleBasicExample],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Collapsible {
  imp = imp;
  usage = usage;
  basicTs = basicTs;
}
