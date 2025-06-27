import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import { SelectObjectsExample } from './examples/objects/objects';
import { SelectPopoverExample } from './examples/popover/popover';
import { SelectMultipleExample } from './examples/multiple/multiple';

@Component({
  selector: 'app-select',
  templateUrl: './index.html',
  imports: [DocsPage, SelectObjectsExample, SelectPopoverExample, SelectMultipleExample],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Select {
  imp = imp;
  usage = usage;
}
