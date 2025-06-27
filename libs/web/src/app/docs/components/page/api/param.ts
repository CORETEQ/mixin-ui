import { Directive, computed, forwardRef, input } from '@angular/core';
import { DocsAbstractApiItem, type DocsApiMember } from './types';

@Directive({
  standalone: true,
  selector: 'docs-param',
  providers: [{ provide: DocsAbstractApiItem, useExisting: forwardRef(() => DocsParam) }],
})
export class DocsParam extends DocsAbstractApiItem {
  readonly kind = 'param';

  readonly name = input.required<string>();
  readonly type = input.required<string>();
  readonly description = input<any>();
  readonly members = computed<DocsApiMember[]>(() => [
    {
      content: `<code>${this.name()}</code>`,
      hint: this.getHint('name'),
    },
    {
      content: `<code class="faded">${this.type()}</code>`,
      hint: this.getHint('type'),
    },
    {
      content: this.description(),
    },
  ]);
}
