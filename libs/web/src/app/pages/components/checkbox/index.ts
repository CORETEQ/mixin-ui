import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import basicTs from './examples/basic/basic?raw&lang=ts';
import radiiTs from './examples/radii/radii?raw&lang=ts';
import sizesTs from './examples/sizes/sizes?raw&lang=ts';
import statesTs from './examples/states/states?raw&lang=ts';
import { CheckboxBasicExample } from './examples/basic/basic';
import { StatesExample } from './examples/states/states';
import { SizesExample } from './examples/sizes/sizes';
import { RadiiExample } from './examples/radii/radii';

@Component({
  selector: 'app-checkbox',
  templateUrl: './index.html',
  imports: [DocsPage, CheckboxBasicExample, StatesExample, SizesExample, RadiiExample],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Checkbox {
  imp = imp;
  usage = usage;
  basicTs = basicTs;
  radiiTs = radiiTs;
  sizesTs = sizesTs;
  statesTs = statesTs;
}
