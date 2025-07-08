import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import { InputTextBasicExample } from './examples/basic/basic';
import { InputTextSizesExample } from './examples/sizes/sizes';
import { InputTextRadiiExample } from './examples/radii/radii';

@Component({
  selector: 'app-input-text',
  templateUrl: './index.html',
  imports: [DocsPage, InputTextBasicExample, InputTextSizesExample, InputTextRadiiExample],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputText {
  imp = imp;
  usage = usage;
}
