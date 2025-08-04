import { Type } from '@angular/core';

export function isComponent<T>(x: unknown): x is Type<T> {
  return x instanceof Type;
}
