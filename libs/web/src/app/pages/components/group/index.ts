import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import { GroupBasicExample } from './examples/basic/basic';

@Component({
  selector: 'app-group',
  templateUrl: './index.html',
  imports: [DocsPage, GroupBasicExample],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Group {
  imp = imp;
  usage = usage;
}
