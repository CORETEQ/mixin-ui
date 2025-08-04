import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import basicTs from './examples/basic/basic?raw&lang=ts';
import { TooltipBasicExample } from './examples/basic/basic';

@Component({
  selector: 'app-tooltip',
  templateUrl: './index.html',
  imports: [DocsPage, TooltipBasicExample],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Tooltip {
  imp = imp;
  usage = usage;
  basicTs = basicTs;
}
