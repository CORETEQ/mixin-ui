import { Directive, computed, forwardRef, input } from '@angular/core';
import { DocsAbstractApiItem, type DocsApiMember } from './types';

@Directive({
  standalone: true,
  selector: 'docs-event',
  providers: [{ provide: DocsAbstractApiItem, useExisting: forwardRef(() => DocsEvent) }],
})
export class DocsEvent extends DocsAbstractApiItem {
  readonly kind = 'output';

  readonly name = input.required<string>();
  readonly type = input.required<string>();
  readonly description = input<any>();
  readonly members = computed<DocsApiMember[]>(() => [
    {
      content: `(${this.name()})`,
    },
    {
      content: this.type(),
    },
    {
      content: this.description(),
    },
  ]);
}
