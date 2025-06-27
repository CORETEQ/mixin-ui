import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocsPageNav } from '@/docs/components/page-nav';
import { DocsSidebar } from '@/docs/components/sidebar';
import { DocsHeader } from '@/docs/components/header';
import { DocsFooter } from '@/docs/components/footer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './layout.html',
  imports: [RouterOutlet, DocsPageNav, DocsSidebar, DocsHeader, DocsFooter],
  selector: 'docs-layout',
  host: { class: 'docs-layout' },
})
export class DocsLayout {}
