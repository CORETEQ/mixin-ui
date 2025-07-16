import { isElement } from './is-element';

export function isMatchingTarget(e: Event, selectors: string): boolean {
  return isElement(e.target) && e.target.matches(selectors);
}
