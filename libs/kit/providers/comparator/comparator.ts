import { InjectionToken } from '@angular/core';

const defaultComparator: XComparator = <T>(a: T, b: T) => a === b;

export type XComparator<T = any> = (a: T, b: T) => boolean;

export const X_COMPARATOR = new InjectionToken<XComparator>('COMPARATOR', {
  factory: () => defaultComparator,
});
