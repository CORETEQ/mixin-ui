import { Directive, computed, forwardRef, input } from '@angular/core';
import { DocsAbstractApiItem, type DocsApiMember } from './types';

@Directive({
  standalone: true,
  selector: 'docs-option',
  providers: [{ provide: DocsAbstractApiItem, useExisting: forwardRef(() => DocsOption) }],
})
export class DocsOption extends DocsAbstractApiItem {
  readonly kind = 'option';

  readonly name = input.required<string>();
  readonly type = input.required<string>();
  readonly default = input<any>();

  readonly members = computed<DocsApiMember[]>(() => {
    const def = this.default();

    return [
      {
        content: `<code>${this.name()}</code>`,
        hint: this.getHint('name'),
      },
      {
        content: `<code class="faded">${this.type()}</code>`,
        hint: this.getHint('type'),
      },
      {
        content: def ? `<code class="faded">${def}</code>` : `-`,
      },
    ];
  });
}
