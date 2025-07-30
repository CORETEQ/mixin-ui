import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import { InputNumberBasicExample } from './examples/basic/basic';
import { XIcon } from '@mixin-ui/kit';
import { InputNumberDecimalExample } from './examples/decimal/decimal';
import { InputNumberAffixesExample } from './examples/affixes/affixes';
import { InputNumberSeparatorsExample } from './examples/separators/separators';
import { InputNumberCustomExample } from './examples/custom/custom';
import { InputNumberStatesExample } from './examples/states/states';

@Component({
  selector: 'app-input-number',
  templateUrl: './index.html',
  imports: [
    DocsPage,
    InputNumberBasicExample,
    XIcon,
    InputNumberDecimalExample,
    InputNumberAffixesExample,
    InputNumberSeparatorsExample,
    InputNumberCustomExample,
    InputNumberStatesExample,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputNumber {
  imp = imp;
  usage = usage;
}
