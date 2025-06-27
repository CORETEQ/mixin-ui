import { TemplateRef } from '@angular/core';

export function isTemplate<C>(x: unknown): x is TemplateRef<C> {
  return x instanceof TemplateRef;
}
