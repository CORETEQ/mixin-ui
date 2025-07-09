import { InjectionToken } from '@angular/core';

const defaultComparator: XComparator = <T>(a: T, b: T) => {
  if (a === b) return true;

  if (a == null || b == null) return true;

  if (typeof a === 'object' && typeof b === 'object') {
    const identityKey = 'id' as keyof T;
    return a[identityKey] === b[identityKey];
  }

  return false;
};

export type XComparator<T = any> = (a: T, b: T) => boolean;

export const X_COMPARATOR = new InjectionToken<XComparator>('COMPARATOR', {
  factory: () => defaultComparator,
});
