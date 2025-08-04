import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';
import { fromRouterEvent } from '@mixin-ui/cdk';
import { DOCS_NAV_ITEMS } from '../../providers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sidebar.html',
  imports: [RouterLinkActive, RouterLink],
  selector: 'docs-sidebar',
  host: {
    class: 'docs-sidebar',
  },
})
export class DocsSidebar {
  readonly items = inject(DOCS_NAV_ITEMS);
  readonly active = signal(this.items[0]);

  constructor() {
    fromRouterEvent(ActivationEnd)
      .pipe(
        map(e => e.snapshot.data?.section),
        filter(section => !!section && section !== this.active().section),
        takeUntilDestroyed()
      )
      .subscribe(section => {
        const itemToActivate = this.items.find(i => i.section === section);
        if (itemToActivate) {
          this.active.set(itemToActivate);
        }
      });
  }
}
