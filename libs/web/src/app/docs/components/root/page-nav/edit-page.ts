import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { map, startWith } from 'rxjs';
import { fromRouterEvent } from '@mixin-ui/cdk';
import { XIcon } from '@mixin-ui/kit';
import { environment } from '../../../../env';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'docs-edit-page',
  imports: [XIcon],
  template: `
    <a
      class="flex items-center gap-1 text-sm leading-8 text-gray-600 hover:text-gray-950"
      target="_blank"
      [attr.href]="href()"
    >
      Edit this page
      <x-icon size="13" src="arrow-up-right" class="mt-0.5" />
    </a>
  `,
})
export class DocsEditPage {
  readonly #router = inject(Router);
  readonly #pagesUrl = `${environment.githubUrl}/edit/main/libs/web/src/app/pages`;

  readonly href = toSignal(
    fromRouterEvent(NavigationEnd).pipe(
      startWith({ url: this.#router.url }),
      map(e => `${this.#pagesUrl}${e.url}/index.html`)
    )
  );
}
