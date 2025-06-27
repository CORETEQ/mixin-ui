import { TemplateRef, Type as Component } from '@angular/core';
import { isComponent, isTemplate } from '@mixin-ui/cdk/utils';

type Type = 'component' | 'template' | 'value';

type Outlet<T extends Type, O extends XOutlet> = {
  readonly type: T;
  readonly outlet: O;
};

type ComponentOutlet<C> = Outlet<'component', Component<C>>;
type TemplateOutlet<C> = Outlet<'template', TemplateRef<C>>;
type ValueOutlet = Outlet<'value', string | null | undefined>;

export type XOutlet<C = unknown> = Component<C> | TemplateRef<C> | string | null | undefined;

export function typedOutlet<C>(
  outlet: XOutlet<C>
): ComponentOutlet<C> | TemplateOutlet<C> | ValueOutlet {
  if (isComponent<C>(outlet)) {
    return { type: 'component', outlet };
  } else if (isTemplate<C>(outlet)) {
    return { type: 'template', outlet };
  } else {
    return { type: 'value', outlet };
  }
}
