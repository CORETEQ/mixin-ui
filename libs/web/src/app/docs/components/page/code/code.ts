import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'docs-code',
  styleUrl: './code.scss',
  template: ` <div [innerHTML]="html()"></div> `,
  host: {
    class: 'docs-code',
    '[class.with-numbers]': 'withNumbers()',
  },
})
export class DocsCode {
  readonly #sanitizer = inject(DomSanitizer);

  readonly src = input<string>();
  readonly withNumbers = input(true, { transform: booleanAttribute });
  readonly html = computed(() => this.#sanitizer.bypassSecurityTrustHtml(this.src() || ''));
}
