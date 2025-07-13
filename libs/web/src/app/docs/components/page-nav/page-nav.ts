import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DocsEditPage } from '@/docs/components/page-nav/edit-page';
import { DocsScrollTop } from '@/docs/components/page-nav/scroll-top';
import { SourceCode } from '@/docs/components/page-nav/source-code';
import { DocsPageService } from '@/docs/services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './page-nav.html',
  imports: [RouterLink, RouterLinkActive, DocsEditPage, DocsScrollTop, SourceCode],
  selector: 'docs-page-nav',
})
export class DocsPageNav {
  protected readonly page = toSignal(inject(DocsPageService), { requireSync: true });

  protected readonly rlaOptions: IsActiveMatchOptions = {
    paths: 'exact',
    fragment: 'exact',
    queryParams: 'ignored',
    matrixParams: 'ignored',
  };
}
