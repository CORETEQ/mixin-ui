import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './exaxmples/import?raw&lang=ts';
import usage from './exaxmples/usage?raw&lang=ts';

@Component({
  selector: 'app-separator',
  templateUrl: './index.html',
  imports: [DocsPage],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Separator {
  imp = imp;
  usage = usage;
}
