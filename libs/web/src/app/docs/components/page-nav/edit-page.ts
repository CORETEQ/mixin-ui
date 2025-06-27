import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { map, startWith } from 'rxjs';
import { fromRouterEvent } from '@mixin-ui/cdk';
import { XIcon } from '@mixin-ui/kit';

@Component({
  selector: 'docs-edit-page',
  template: `
    <a
      class="flex items-center gap-1 text-sm leading-8 text-[#707070] hover:text-[#09090B]"
      target="_blank"
      [attr.href]="href()"
    >
      Edit this page
      <x-icon src="arrow-up-right" class="mt-0.5" />
    </a>
  `,
  imports: [XIcon],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsEditPage {
  readonly #router = inject(Router);
  readonly #pagesUrl = 'https://github.com/CORETEQ/mixin-ui/edit/main/libs/web/src/app/pages';

  readonly href = toSignal(
    fromRouterEvent(NavigationEnd).pipe(
      startWith({ url: this.#router.url }),
      map(e => `${this.#pagesUrl}${e.url}/index.html`)
    )
  );
}
