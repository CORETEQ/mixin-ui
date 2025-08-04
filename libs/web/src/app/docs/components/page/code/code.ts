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
  template: `
    <div class="docs-code-container">
      <div
        class="docs-code-content
                  [&::-webkit-scrollbar]:w-1.5
                  [&::-webkit-scrollbar]:h-1.5
                  [&::-webkit-scrollbar-corner]:bg-transparent
                  [&::-webkit-scrollbar-track]:bg-gray-800
                  [&::-webkit-scrollbar-thumb]:bg-gray-700
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-thumb]:rounded-full"
        [innerHTML]="html()"
      ></div>
    </div>
  `,
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
