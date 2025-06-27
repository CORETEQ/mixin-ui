import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import { InputTextBasicExample } from './examples/basic/basic';
import { InputTextSizesExample } from './examples/sizes/sizes';
import { InputTextRadiiExample } from './examples/radii/radii';
import { InputTextColorExample } from './examples/colors/colors';

@Component({
  selector: 'app-input-text',
  templateUrl: './index.html',
  imports: [
    DocsPage,
    InputTextBasicExample,
    InputTextSizesExample,
    InputTextRadiiExample,
    InputTextColorExample,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputText {
  imp = imp;
  usage = usage;
}
