import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import { TextareaBasicExample } from './examples/basic/basic';

@Component({
  selector: 'app-textarea',
  templateUrl: './index.html',
  imports: [DocsPage, TextareaBasicExample],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Textarea {
  imp = imp;
  usage = usage;
}
