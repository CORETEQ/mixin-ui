import { InjectionToken } from '@angular/core';
import { isObject } from '@mixin-ui/cdk';

export type XComparator<T = any> = (a: T, b: T) => boolean;

export const createKeyComparator = (key: PropertyKey): XComparator<Record<PropertyKey, any>> => {
  return (a, b) => {
    if (!isObject(a) || !isObject(b)) {
      throw new Error(
        ngDevMode
          ? `Cannot compare by key "${key.toString()}" if one of the values is not an object.`
          : ''
      );
    }

    return a[key] === b[key];
  };
};

export const X_COMPARATOR = new InjectionToken<XComparator>('COMPARATOR', {
  factory: () => (a, b) => a === b,
});
