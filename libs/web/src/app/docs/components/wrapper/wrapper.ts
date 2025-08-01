import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocsPageNav } from '@/docs/components/page-nav';
import { DocsSidebar } from '@/docs/components/sidebar';
import { DocsFooter } from '@/docs/components/footer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './wrapper.html',
  imports: [RouterOutlet, DocsPageNav, DocsSidebar],
  selector: 'docs-wrapper',
  host: { class: 'app-container' },
})
export class DocsWrapper {}
