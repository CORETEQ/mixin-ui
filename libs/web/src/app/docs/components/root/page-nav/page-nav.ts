import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DocsPageService } from '@/docs/services';
import { DocsSourceCode } from './source-code';
import { DocsScrollTop } from './scroll-top';
import { DocsEditPage } from './edit-page';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './page-nav.html',
  imports: [RouterLink, RouterLinkActive, DocsEditPage, DocsScrollTop, DocsSourceCode],
  selector: 'docs-page-nav',
})
export class DocsPageNav {
  readonly page = toSignal(inject(DocsPageService), { requireSync: true });

  readonly rlaOptions: IsActiveMatchOptions = {
    paths: 'exact',
    fragment: 'exact',
    queryParams: 'ignored',
    matrixParams: 'ignored',
  };
}
