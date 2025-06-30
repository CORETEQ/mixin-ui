import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DocsSnippet } from '@/docs/components';
import { XIcon } from '@mixin-ui/kit';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-landing',
  styleUrl: './index.scss',
  templateUrl: './index.html',
  imports: [DocsSnippet, XIcon],
  host: { class: 'app-container' },
})
export default class Landing {}
