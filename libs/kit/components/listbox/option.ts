import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FocusableOption, FocusMonitor, FocusOrigin, Highlightable } from '@angular/cdk/a11y';
import { generateId } from '@mixin-ui/cdk';
import { XPopoverTarget } from '@mixin-ui/kit/directives';
import { XIcon } from '@mixin-ui/kit/components/icon';
import { XListbox } from './listbox';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-option',
  styleUrl: './option.scss',
  templateUrl: './option.html',
  imports: [XIcon],
  host: {
    role: 'option',
    class: 'x-option',
    '[id]': 'id()',
    '[attr.aria-disabled]': 'disabled',
    '[attr.aria-selected]': 'selected',
    '[class.x-active]': 'active()',
    '(pointerenter)': 'handlePointerEnter()',
    '(click)': 'handleClick($event)',
  },
})
export class XOption<V> implements FocusableOption, Highlightable {
  readonly #listbox = inject(XListbox);
  readonly #focusMonitor = inject(FocusMonitor);
  readonly #popover = inject(XPopoverTarget, { skipSelf: true, optional: true });
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;

  readonly id = input(generateId());
  readonly value = input.required<V>();
  readonly _disabled = input(false, { transform: booleanAttribute });
  readonly active = signal(false);

  get disabled(): boolean {
    return this._disabled();
  }

  get selected(): boolean {
    return this.#listbox.isSelected(this);
  }

  focus(origin?: FocusOrigin): void {
    this.#focusMonitor.focusVia(this.#el, origin || 'program');
  }

  /** @internal */
  setActiveStyles(): void {
    this.active.set(true);

    if (this.#listbox.useActiveDescendant()) {
      this.#el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  /** @internal */
  setInactiveStyles(): void {
    this.active.set(false);
  }

  handleClick(e: MouseEvent): void {
    this.#listbox.handleOptionClick(this, e);
  }

  /** @internal */
  handlePointerEnter(): void {
    this.#listbox.handleOptionPointerEnter(this);
  }

  handlePopoverClose(): void {
    // if (!this.#cdkListbox.multiple && this.#cdkOption.isSelected()) {
    //   this.#popover?.toggle(false);
    //   this.#popover?.focus();
    // }
  }
}
