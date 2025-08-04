import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocsPageNav } from '@/docs/components/root/page-nav';
import { DocsSidebar } from '@/docs/components/sidebar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './root.html',
  imports: [RouterOutlet, DocsPageNav, DocsSidebar],
  host: { class: 'app-container' },
})
export class Root {}
