import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import basicTs from './examples/basic/basic?raw&lang=ts';
import multipleTs from './examples/multiple/multiple?raw&lang=ts';
import objectsTs from './examples/objects/objects?raw&lang=ts';
import popoverTs from './examples/popover/popover?raw&lang=ts';
import { SelectObjectsExample } from './examples/objects/objects';
import { SelectPopoverExample } from './examples/popover/popover';
import { SelectMultipleExample } from './examples/multiple/multiple';
import { SelectBasicExample } from './examples/basic/basic';

@Component({
  selector: 'app-select',
  templateUrl: './index.html',
  imports: [
    DocsPage,
    SelectObjectsExample,
    SelectPopoverExample,
    SelectMultipleExample,
    SelectBasicExample,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Select {
  imp = imp;
  usage = usage;
  basicTs = basicTs;
  multipleTs = multipleTs;
  objectsTs = objectsTs;
  popoverTs = popoverTs;
}
