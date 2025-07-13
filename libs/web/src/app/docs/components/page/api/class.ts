import { computed, Directive, forwardRef, input } from '@angular/core';
import { XOutlet } from '@mixin-ui/cdk';
import { DocsAbstractApiItem, DocsApiMember } from './types';

@Directive({
  standalone: true,
  selector: 'docs-class',
  providers: [{ provide: DocsAbstractApiItem, useExisting: forwardRef(() => DocsClass) }],
})
export class DocsClass extends DocsAbstractApiItem {
  readonly kind = 'class';

  readonly name = input.required<string>();
  readonly description = input.required<XOutlet>();
  readonly members = computed<DocsApiMember[]>(() => [
    { content: `<code class="green">.x-${this.name()}</code>` },
    { content: this.description() },
  ]);
}
