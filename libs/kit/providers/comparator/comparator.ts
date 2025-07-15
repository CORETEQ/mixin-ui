import { InjectionToken } from '@angular/core';
import { isObject } from '@mixin-ui/cdk';

export type XComparator<T = unknown> = (a: T, b: T) => boolean;

export const createKeyComparator = (key: string): XComparator => {
  return (a, b) => {
    if (!isObject(a) || !isObject(b)) {
      throw new Error(`Cannot compare by key "${key}" if one of the values is not an object`);
    }

    return a[key] === b[key];
  };
};

const defaultComparator: XComparator = <T>(a: T, b: T) => a === b;

export const X_COMPARATOR = new InjectionToken<XComparator>('COMPARATOR', {
  factory: () => defaultComparator,
});
