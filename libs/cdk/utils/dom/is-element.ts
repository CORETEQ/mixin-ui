export function isElement(x: Element | EventTarget | Node | object | null): x is Element {
  return !!x && 'nodeType' in x && x.nodeType === Node.ELEMENT_NODE;
}

export function isHTMLElement(x: unknown): x is HTMLElement {
  const defaultView = (x as Element | undefined)?.ownerDocument.defaultView;
  return !!x && !!defaultView && x instanceof defaultView.HTMLElement;
}
