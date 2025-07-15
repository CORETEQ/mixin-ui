import { Directive, ElementRef, inject } from '@angular/core';
import { XPopoverTarget } from '@mixin-ui/kit/directives';
import { CDK_MENU } from '@angular/cdk/menu';
import { FocusOrigin } from '@angular/cdk/a11y';
import { hasModifierKey } from '@angular/cdk/keycodes';

@Directive({
  selector: '[x-menu-trigger]',
  host: {
    '(keydown)': 'onKeydown($event)',
    '(click)': 'onClick()',
  },
})
export class XMenuTrigger {
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;
  readonly #overlay = inject(XPopoverTarget, { self: true });
  readonly #parentMenu = inject(CDK_MENU, { optional: true });

  readonly open = this.#overlay.open;

  toggle(open: boolean): void {
    this.#overlay.toggle(open);
  }

  protected onKeydown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'Space':
      case 'Enter':
        if (!hasModifierKey(e) && !eventDispatchesNativeClick(this.#el, e)) {
          this.toggle(!this.open());
          this.focusFirstItem('keyboard');
        }
        break;
      case 'ArrowRight':
        if (!hasModifierKey(e) && this.#parentMenu) {
          e.preventDefault();
          this.toggle(true);
          this.focusFirstItem('keyboard');
        }
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        if (!hasModifierKey(e)) {
          e.preventDefault();
          this.toggle(true);
          if (e.key === 'ArrowDown') {
            this.focusFirstItem('keyboard');
          } else {
            this.focusLastItem('keyboard');
          }
        }
        break;
    }
  }

  protected onClick(): void {
    this.toggle(!this.open());
    this.focusFirstItem('mouse');
  }

  private focusFirstItem(origin?: FocusOrigin): void {
    // this.menu().focusFirstItem(origin);
  }

  private focusLastItem(origin?: FocusOrigin): void {
    // this.menu().focusLastItem(origin);
  }
}

export function eventDispatchesNativeClick(el: HTMLElement, event: KeyboardEvent): boolean {
  if (!event.isTrusted) {
    return false;
  }
  const key = event.key;
  if (el.nodeName === 'BUTTON' && !(el as HTMLButtonElement).disabled) {
    return key === 'Enter' || key === 'Space';
  }
  if (el.nodeName === 'A') {
    return key === 'Enter';
  }
  return false;
}
