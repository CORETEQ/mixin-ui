import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocsFragmentsService } from '@/docs/services';
import { DocsPagePagination } from './pagination';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'docs-page',
  templateUrl: './root.html',
  imports: [DocsPagePagination],
  providers: [DocsFragmentsService],
  host: { class: 'docs-page' },
})
export class DocsPageRoot {
  readonly #snapshot = inject(ActivatedRoute).snapshot;

  readonly name = input(this.#snapshot.title);
  readonly status = input(this.#snapshot.data.status);
  readonly groupName = input(this.#snapshot.parent?.title);
  readonly sourcePath = input(this.#snapshot.data.sourcePath);
}
