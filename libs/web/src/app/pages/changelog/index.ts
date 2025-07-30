import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsPage } from '@/docs/components';
import { MarkdownComponent } from 'ngx-markdown';

import data from '../../../../../../CHANGELOG.md?raw&lang=markdown';

@Component({
  selector: 'app-changelog',
  templateUrl: './index.html',
  imports: [DocsPage, MarkdownComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Changelog {
  data = data;
}
