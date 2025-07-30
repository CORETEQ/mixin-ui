import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DocsPageService } from './page';
import { DocsPageFragment } from '../types';

@Injectable()
export class DocsFragmentsService extends BehaviorSubject<DocsPageFragment[]> {
  readonly #page = inject(DocsPageService);

  constructor() {
    super([]);
    inject(DestroyRef).onDestroy(() => this.next([]));
  }

  override next(item: DocsPageFragment): void;
  override next(items: DocsPageFragment[]): void;
  override next(itemOrItems: DocsPageFragment | DocsPageFragment[]): void {
    super.next(Array.isArray(itemOrItems) ? itemOrItems : this.value.concat(itemOrItems));
    this.#page.next({ ...this.#page.value, fragments: this.value });
  }
}
