import { isHTMLElement } from './is-element';

export function getFocusableElement(root: Node, fromEnd = false): HTMLElement | null {
  if (isHTMLElement(root) && isFocusable(root) === NodeFilter.FILTER_ACCEPT) {
    return root;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode: isFocusable,
  });

  if (fromEnd) {
    let lastFocusable: HTMLElement | null = null;

    if (isHTMLElement(root) && isFocusable(root) === NodeFilter.FILTER_ACCEPT) {
      lastFocusable = root;
    }

    let currentNode = walker.lastChild();

    while (currentNode) {
      currentNode = walker.nextNode();
    }

    currentNode = walker.previousNode();

    while (currentNode) {
      if (isHTMLElement(currentNode)) {
        return currentNode;
      }

      currentNode = walker.previousNode();
    }

    return lastFocusable;
  } else {
    const currentNode = walker.nextNode();

    if (isHTMLElement(currentNode)) {
      return currentNode;
    }

    return null;
  }
}

const isFocusable = (node: Node) => {
  if (
    !isHTMLElement(node) ||
    node.hasAttribute('disabled') ||
    node.getAttribute('tabIndex') === '-1'
  ) {
    return NodeFilter.FILTER_SKIP;
  }

  const tagName = node.tagName;

  if (
    (tagName === 'A' && node.hasAttribute('href')) ||
    (tagName === 'INPUT' && node.getAttribute('type') !== 'hidden') ||
    (tagName === 'VIDEO' && node.hasAttribute('controls')) ||
    node.getAttribute('tabIndex') === '0' ||
    tagName === 'BUTTON' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA' ||
    tagName === 'DETAILS' ||
    tagName === 'IFRAME' ||
    tagName === 'OBJECT'
  ) {
    return NodeFilter.FILTER_ACCEPT;
  }

  return NodeFilter.FILTER_SKIP;
};
