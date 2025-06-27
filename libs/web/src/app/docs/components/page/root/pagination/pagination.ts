import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DOCS_NAV_ITEMS } from '@/docs/providers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'docs-page-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
})
export class DocsPagePagination {
  readonly #url = inject(Router).url;
  readonly #section = inject(ActivatedRoute).snapshot.data.section;
  readonly #navItems = inject(DOCS_NAV_ITEMS);

  readonly #siblings =
    this.#navItems
      .find(i => i.section === this.#section)
      ?.children?.flatMap(i => i.children ?? []) || [];

  readonly #currIndex = this.#siblings.findIndex(i => i.routerLink === this.currentPagePath);
  readonly previous = this.#siblings[this.#currIndex - 1];
  readonly next = this.#siblings[this.#currIndex + 1];

  private get currentPagePath(): string {
    const hashIndex = this.#url.indexOf('#');
    return hashIndex !== -1 ? this.#url.substring(0, hashIndex) : this.#url;
  }
}
