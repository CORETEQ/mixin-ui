import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import imp from './examples/import?raw&lang=ts';
import usage from './examples/usage?raw&lang=ts';
import basicTs from './examples/basic/basic?raw&lang=ts';
import colorsTs from './examples/colors/colors?raw&lang=ts';
import iconTs from './examples/icon/icon?raw&lang=ts';
import loadingTs from './examples/loading/loading?raw&lang=ts';
import radiiTs from './examples/radii/radii?raw&lang=ts';
import sizesTs from './examples/sizes/sizes?raw&lang=ts';
import variantsTs from './examples/variants/variants?raw&lang=ts';
import { RadiiExample } from './examples/radii/radii';
import { SizesExample } from './examples/sizes/sizes';
import { VariantsExample } from './examples/variants/variants';
import { ColorsExample } from './examples/colors/colors';
import { LoadingExample } from './examples/loading/loading';
import { IconExample } from './examples/icon/icon';
import { ButtonBasicExample } from './examples/basic/basic';

@Component({
  selector: 'app-button',
  templateUrl: './index.html',
  imports: [
    DocsPage,
    RadiiExample,
    SizesExample,
    VariantsExample,
    ColorsExample,
    LoadingExample,
    IconExample,
    ButtonBasicExample,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Button {
  imp = imp;
  usage = usage;
  basicTs = basicTs;
  variantsTs = variantsTs;
  sizesTs = sizesTs;
  radiiTs = radiiTs;
  colorsTs = colorsTs;
  loadingTs = loadingTs;
  iconTs = iconTs;
}
