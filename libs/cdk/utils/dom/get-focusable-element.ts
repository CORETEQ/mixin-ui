import { isHTMLElement } from '@mixin-ui/cdk/utils';

export function getFocusableElement(root: Node): HTMLElement | null {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode: isFocusable,
  });

  const currentNode = walker.nextNode();

  if (isHTMLElement(currentNode)) {
    return currentNode;
  }

  return null;
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
