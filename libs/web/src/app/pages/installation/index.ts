import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';

import ng from './examples/angular.md?raw&lang=shellscript';
import cdk from './examples/cdk.md?raw&lang=shellscript';
import deps from './examples/deps.md?raw&lang=shellscript';
import styles from './examples/assets.md?raw&lang=json';

@Component({
  selector: 'app-installation',
  templateUrl: './index.html',
  imports: [DocsPage],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Installation {
  ng = ng;
  cdk = cdk;
  deps = deps;
  styles = styles;
}
