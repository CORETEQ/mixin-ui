import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import { CalendarBasicExample } from './examples/basic/basic';
import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';

@Component({
  selector: 'app-calendar',
  templateUrl: './index.html',
  imports: [DocsPage, CalendarBasicExample],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Calendar {
  imp = imp;
  usage = usage;
}
