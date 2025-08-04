import { Directive, computed, forwardRef, input } from '@angular/core';
import { DocsAbstractApiItem, type DocsApiMember } from './types';
import { capitalize } from '@/docs/utils';

@Directive({
  standalone: true,
  selector: 'docs-var',
  providers: [{ provide: DocsAbstractApiItem, useExisting: forwardRef(() => DocsVar) }],
})
export class DocsVar extends DocsAbstractApiItem {
  readonly kind = 'var';

  readonly name = input.required<string>();
  readonly description = input.required<any>();
  readonly members = computed<DocsApiMember[]>(() => {
    const description = this.description();

    return [
      {
        content: `--x-${this.name()}`,
      },
      {
        content: typeof description === 'string' ? `${capitalize(description)}` : description,
      },
    ];
  });
}
