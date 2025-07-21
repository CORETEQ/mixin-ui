import { InjectionToken } from '@angular/core';
import { isObject } from '@mixin-ui/cdk';

export type XComparator<T = any> = (a: T, b: T) => boolean;

export const createKeyComparator = (key: PropertyKey): XComparator => {
  return (a: Record<PropertyKey, unknown>, b: Record<PropertyKey, unknown>) => {
    if (!isObject(a) || !isObject(b)) {
      throw new Error(
        `Cannot compare by key "${key.toString()}" if one of the values is not an object`
      );
    }

    return a[key] === b[key];
  };
};

const defaultComparator: XComparator = <T>(a: T, b: T) => a === b;

export const X_COMPARATOR = new InjectionToken<XComparator>('COMPARATOR', {
  factory: () => defaultComparator,
});
