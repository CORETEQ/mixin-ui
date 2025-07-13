import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import { SwitchBasicExample } from './examples/basic/basic';
import { RadiiExample } from './examples/radii/radii';
import { SizesExample } from './examples/sizes/sizes';

@Component({
  selector: 'app-switch',
  templateUrl: './index.html',
  imports: [DocsPage, SwitchBasicExample, RadiiExample, SizesExample],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Switch {
  imp = imp;
  usage = usage;
}
