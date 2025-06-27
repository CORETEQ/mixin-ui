import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import { PopoverBasicExample } from './examples/basic/basic';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popover',
  templateUrl: './index.html',
  imports: [DocsPage, PopoverBasicExample, RouterLink],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Popover {
  imp = imp;
  usage = usage;
}
