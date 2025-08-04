import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import basicTs from './examples/basic/basic?raw&lang=ts';
import { AccordionBasicExample } from './examples/basic/basic';
import { AccordionMultipleExample } from './examples/multiple/multiple';
import { AccordionSizesExample } from './examples/sizes/sizes';
import { AccordionRadiiExample } from './examples/radii/radii';

@Component({
  selector: 'app-accordion',
  templateUrl: './index.html',
  imports: [
    DocsPage,
    AccordionBasicExample,
    AccordionMultipleExample,
    AccordionSizesExample,
    AccordionRadiiExample,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Accordion {
  imp = imp;
  usage = usage;
  basicTs = basicTs;
}
