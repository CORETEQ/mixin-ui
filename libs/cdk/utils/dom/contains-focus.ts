import { getActiveElement } from './get-active-element';

export function containsFocus(element: Element): boolean {
  const activeElement = getActiveElement(element.ownerDocument);
  return element === activeElement || element.contains(activeElement);
}
