import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { XButton } from '@mixin-ui/kit';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import { RadiiExample } from './examples/radii/radii';
import { SizesExample } from './examples/sizes/sizes';
import { VariantsExample } from './examples/variants/variants';
import { ColorsExample } from './examples/colors/colors';
import { LoadingExample } from './examples/loading/loading';
import { IconExample } from './examples/icon/icon';

@Component({
  selector: 'app-button',
  templateUrl: './index.html',
  imports: [
    DocsPage,
    XButton,
    RadiiExample,
    SizesExample,
    VariantsExample,
    ColorsExample,
    LoadingExample,
    IconExample,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Button {
  imp = imp;
  usage = usage;
}
