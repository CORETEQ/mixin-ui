import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import { SwitchBasicExample } from './examples/basic/basic';
import { RadiiExample } from './examples/radii/radii';
import { SizesExample } from './examples/sizes/sizes';
import { ColorsExample } from './examples/colors/colors';

@Component({
  selector: 'app-switch',
  templateUrl: './index.html',
  imports: [DocsPage, SwitchBasicExample, RadiiExample, SizesExample, ColorsExample],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Switch {
  imp = imp;
  usage = usage;
}
