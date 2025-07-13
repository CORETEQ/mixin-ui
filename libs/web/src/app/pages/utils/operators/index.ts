import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import router from './examples/from-router-event?raw&lang=ts';
import render from './examples/from-after-next-render?raw&lang=ts';

@Component({
  selector: 'app-operators',
  templateUrl: './index.html',
  imports: [DocsPage],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Operators {
  router = router;
  render = render;
}
