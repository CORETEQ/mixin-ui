import { isElement } from './is-element';

export function relatedTo(e: MouseEvent | FocusEvent, el: HTMLElement | null): boolean;
export function relatedTo(e: MouseEvent | FocusEvent, selector: string): boolean;
export function relatedTo(
  e: MouseEvent | FocusEvent,
  elOrSelector: HTMLElement | null | string
): boolean {
  const { relatedTarget } = e;

  if (!isElement(relatedTarget)) {
    return false;
  }

  if (typeof elOrSelector === 'string') {
    return !!relatedTarget.closest(elOrSelector);
  }

  return !!elOrSelector?.contains(relatedTarget);
}
