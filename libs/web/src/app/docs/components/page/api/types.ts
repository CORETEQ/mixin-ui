import { contentChildren, Directive, Signal, TemplateRef } from '@angular/core';
import { XOutlet } from '@mixin-ui/cdk';
import { DocsHint } from './hint';

export type DocsApiKind = 'input' | 'output' | 'class' | 'var' | 'param' | 'option' | 'slot';

export interface DocsApiMember {
  readonly content?: XOutlet;
  readonly hint?: TemplateRef<unknown>;
}

@Directive()
export abstract class DocsAbstractApiItem {
  readonly hints = contentChildren(DocsHint);

  abstract readonly kind: DocsApiKind;
  abstract readonly members: Signal<ReadonlyArray<DocsApiMember>>;

  protected getHint<T extends keyof this>(key: T): TemplateRef<unknown> | undefined {
    return this.hints().find(hint => hint.for === key)?.content;
  }
}
