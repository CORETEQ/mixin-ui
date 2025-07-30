import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import { InputMaskBasicExample } from './examples/basic/basic';

@Component({
  selector: 'app-input-mask',
  templateUrl: './index.html',
  imports: [DocsPage, InputMaskBasicExample],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputMask {
  imp = imp;
  usage = usage;
}
