import { computed, Directive, forwardRef, input, TemplateRef } from '@angular/core';
import { DocsAbstractApiItem, type DocsApiMember } from './types';

type DocsPropType = 'string' | 'number' | 'boolean' | 'enum' | string;

@Directive({
  standalone: true,
  selector: 'docs-input',
  providers: [{ provide: DocsAbstractApiItem, useExisting: forwardRef(() => DocsInput) }],
})
export class DocsInput extends DocsAbstractApiItem {
  readonly kind = 'input';

  readonly name = input.required<string>();
  readonly type = input.required<DocsPropType>();
  readonly default = input<string | TemplateRef<unknown>>();
  readonly prop = input<'input' | 'output' | 'model'>('input');
  readonly members = computed<DocsApiMember[]>(() => {
    return [
      {
        content: `<code class="white">${this.processText(this.name())}</code>`,
        hint: this.getHint('name'),
      },
      {
        content: `<code>${this.type()}</code>`,
        hint: this.getHint('type'),
      },
      {
        content: this.defaultContent,
      },
    ];
  });

  private get defaultContent() {
    const def = this.default();

    if (typeof def === 'string') {
      return `<span class="muted">${this.type() === 'string' ? `"${def}"` : def}</span>`;
    }

    return def;
  }

  private processText(name: string): string {
    switch (this.prop()) {
      case 'input':
        return `${name}`;
      case 'output':
        return `(${name})`;
      default:
        return `${name}`;
    }
  }
}
