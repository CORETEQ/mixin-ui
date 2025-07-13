import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import path from './examples/path?raw&lang=ts';
import { IconBasicExample } from './examples/basic/basic';

@Component({
  selector: 'app-icon',
  templateUrl: './index.html',
  imports: [DocsPage, IconBasicExample],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Icon {
  imp = imp;
  usage = usage;
  path = path;
}
