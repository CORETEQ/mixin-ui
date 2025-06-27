import { Directive, computed, forwardRef, input } from '@angular/core';
import { DocsAbstractApiItem, type DocsApiMember } from './types';
import { capitalize } from '@/docs/utils';

@Directive({
  standalone: true,
  selector: 'docs-slot',
  providers: [{ provide: DocsAbstractApiItem, useExisting: forwardRef(() => DocsSlot) }],
})
export class DocsSlot extends DocsAbstractApiItem {
  readonly kind = 'slot';

  readonly name = input<string>();
  readonly context = input<string>();
  readonly description = input<any>();
  readonly members = computed<DocsApiMember[]>(() => {
    const context = this.context();
    const description = this.description();

    return [
      {
        content: `<code class="orange">${this.name() ? `x-slot="${this.name()}"` : `<span>""</span>`}</code>`,
      },
      {
        content: context ? `<code>${context}</code>` : '',
      },
      {
        content: typeof description === 'string' ? `${capitalize(description)}` : description,
      },
    ];
  });
}
