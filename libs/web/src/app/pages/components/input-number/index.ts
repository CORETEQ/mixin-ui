import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { XIcon } from '@mixin-ui/kit';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import basicTs from './examples/basic/basic?raw&lang=ts';
import affixesTs from './examples/affixes/affixes?raw&lang=ts';
import customTs from './examples/custom/custom?raw&lang=ts';
import decimalTs from './examples/decimal/decimal?raw&lang=ts';
import separatorsTs from './examples/separators/separators?raw&lang=ts';
import statesTs from './examples/states/states?raw&lang=ts';
import { InputNumberBasicExample } from './examples/basic/basic';
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
  basicTs = basicTs;
  decimalTs = decimalTs;
  affixesTs = affixesTs;
  customTs = customTs;
  separatorsTs = separatorsTs;
  statesTs = statesTs;
}
