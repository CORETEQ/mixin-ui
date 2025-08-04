import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, fromEvent, map, startWith, switchMap } from 'rxjs';
import { fromAfterNextRender } from '@mixin-ui/cdk';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'docs-scroll-top',
  template: `
    <button
      type="button"
      class="flex items-center cursor-pointer gap-1 text-sm leading-8 text-gray-600 hover:text-gray-950"
      (click)="scrollTop()"
    >
      Scroll to top
    </button>
  `,
  host: {
    class: 'transition-opacity opacity-0 pointer-events-none',
    '[class.!opacity-100]': 'visible()',
    '[class.!pointer-events-auto]': 'visible()',
  },
})
export class DocsScrollTop {
  readonly #doc = inject(DOCUMENT);

  readonly visible = toSignal(
    fromAfterNextRender().pipe(
      switchMap(() =>
        fromEvent(window, 'scroll').pipe(
          startWith(null),
          map(() => this.#doc.body.scrollTop > 100 || this.#doc.documentElement.scrollTop > 100)
        )
      ),
      distinctUntilChanged()
    ),
    { initialValue: false }
  );

  scrollTop(): void {
    this.#doc.documentElement.scrollTop = 0;
  }
}
