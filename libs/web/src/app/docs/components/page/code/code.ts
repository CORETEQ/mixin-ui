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
import { XButton, XIcon } from '@mixin-ui/kit';
import { DocsCopy } from '../copy';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'docs-code',
  styleUrl: './code.scss',
  template: `
    <button
      #dc="docsCopy"
      x-icon
      variant="ghost"
      size="md"
      color="neutral"
      [docsCopy]="src() || ''"
    >
      @if (dc.copied()) {
      <x-icon src="check" size="15" />
      } @else {
      <x-icon src="clipboard" size="15" />
      }
    </button>

    <div class="docs-code-inner" [innerHTML]="html()"></div>
  `,
  host: {
    class: 'docs-code',
    '[class.with-numbers]': 'withNumbers()',
  },
  imports: [DocsCopy, XButton, XIcon],
})
export class DocsCode {
  readonly #sanitizer = inject(DomSanitizer);

  readonly src = input<string>();
  readonly withNumbers = input(true, { transform: booleanAttribute });
  readonly html = computed(() => this.#sanitizer.bypassSecurityTrustHtml(this.src() || ''));
}
