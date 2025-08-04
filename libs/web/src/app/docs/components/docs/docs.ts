import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocsPageNav } from '@/docs/components/docs/page-nav';
import { DocsSidebar } from '@/docs/components/sidebar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './docs.html',
  imports: [RouterOutlet, DocsPageNav, DocsSidebar],
  host: { class: 'app-container' },
})
export class Docs {}
