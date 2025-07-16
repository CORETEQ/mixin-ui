import { isElement } from '@mixin-ui/cdk/utils';

export function isMatchingTarget(e: Event, selectors: string): boolean {
  return isElement(e.target) && e.target.matches(selectors);
}
