import { isElement } from './is-element';

export function relatedTo(e: MouseEvent | FocusEvent, el: HTMLElement | null): boolean {
  return isElement(e.relatedTarget) && !!el?.contains(e.relatedTarget);
}
