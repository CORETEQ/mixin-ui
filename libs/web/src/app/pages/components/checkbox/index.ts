import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import { CheckboxBasicExample } from './examples/basic/basic';
import { StatesExample } from './examples/states/states';
import { SizesExample } from './examples/sizes/sizes';
import { RadiiExample } from './examples/radii/radii';
import { ColorsExample } from './examples/colors/colors';

@Component({
  selector: 'app-checkbox',
  templateUrl: './index.html',
  imports: [
    DocsPage,
    CheckboxBasicExample,
    StatesExample,
    SizesExample,
    RadiiExample,
    ColorsExample,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Checkbox {
  imp = imp;
  usage = usage;
}
