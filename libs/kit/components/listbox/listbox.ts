import {
  afterNextRender,
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  inject,
  INJECTOR,
  input,
  OnDestroy,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { coerceArray } from '@angular/cdk/coercion';
import { EMPTY, merge } from 'rxjs';
import { relatedTo, watch, XTypedOutletPipe } from '@mixin-ui/cdk';
import { XPopoverTarget } from '@mixin-ui/kit/directives';
import { XOption } from './option';
import { X_LISTBOX_ACCESSOR } from './providers';
import { X_LISTBOX_OPTIONS } from './options';

class ListboxSelectionModel<T> extends SelectionModel<T> {
  constructor(
    public multiple = false,
    initiallySelectedValues?: T[],
    emitChanges = true,
    compareWith?: (o1: T, o2: T) => boolean
  ) {
    super(true, initiallySelectedValues, emitChanges, compareWith);
  }

  override isMultipleSelection(): boolean {
    return this.multiple;
  }

  override select(...values: T[]) {
    if (this.multiple) {
      return super.select(...values);
    } else {
      return super.setSelection(...values);
    }
  }
}

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-listbox',
  styleUrl: './listbox.scss',
  templateUrl: './listbox.html',
  imports: [XTypedOutletPipe, NgComponentOutlet, NgTemplateOutlet],
  host: {
    role: 'listbox',
    '[class]': '`x-listbox x-size-${size()} x-radius-${radius()}`',
    '(keydown)': 'handleKeydown($event)',
    '(pointerdown)': 'handlePointerdown($event)',
    '(pointerout)': 'handlePointerout($event)',
  },
})
export class XListbox<T> implements OnDestroy {
  readonly #opt = inject(X_LISTBOX_OPTIONS);
  readonly #accessor = inject(X_LISTBOX_ACCESSOR, { optional: true });
  readonly #popover = inject(XPopoverTarget, { optional: true });
  readonly #injector = inject(INJECTOR);

  readonly options = contentChildren(XOption<T>);
  readonly size = input(this.#opt.size);
  readonly radius = input(this.#opt.radius);
  readonly wrapNavigation = input(this.#opt.wrapNavigation, { transform: booleanAttribute });
  readonly emptyContent = input(this.#opt.emptyContent);
  readonly useActiveDescendant = input(true);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly empty = computed(() => this.options().length === 0);

  readonly #model = new ListboxSelectionModel<T>();

  readonly #keyManager = new ActiveDescendantKeyManager(this.options, this.#injector)
    .skipPredicate(option => option.disabled)
    .withAllowedModifierKeys(['shiftKey'])
    .withHomeAndEnd();

  constructor() {
    afterNextRender(() => {
      const selected = this.#model.selected.at(0);

      if (selected) {
        const option = this.options().find(option => option.value() === selected);

        if (option) {
          this.#keyManager.setActiveItem(option);
        }
      } else {
        this.#keyManager.setFirstItemActive();
      }
    });

    watch(this.options, () => {
      this.resetActiveOption();
    });

    effect(() => {
      const wrap = this.wrapNavigation();

      untracked(() => {
        this.#keyManager.withWrap(wrap);
      });
    });

    effect(() => {
      const value = this.#accessor?.selection();
      const multiple = this.#accessor?.multiple?.() || false;
      const comparator = this.#accessor?.comparator?.();

      untracked(() => {
        this.#model.setSelection(...this.coerceValue(value));
        this.#model.multiple = multiple;
        this.#model.compareWith = comparator;
      });
    });

    afterRenderEffect(() => {
      const options = this.options();

      untracked(() => {
        this.#accessor?.handleListboxOptions?.(options);
      });
    });

    merge(this.#accessor?.keyboardEvents || EMPTY)
      .pipe(takeUntilDestroyed())
      .subscribe(e => this.handleKeydown(e));

    this.#keyManager.change.pipe(takeUntilDestroyed()).subscribe(index => {
      const option = this.options()[index];
      this.#accessor?.handleListboxActiveDescendant?.(option);
    });
  }

  get value(): readonly T[] {
    return this.#model.selected;
  }

  get multiple(): boolean {
    return this.#model.isMultipleSelection();
  }

  isSelected(option: XOption<T>): boolean {
    return this.#model.isSelected(option.value());
  }

  /** @internal */
  handleKeydown(e: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      this.updateValue(this.activeOption);
    }

    this.#keyManager.onKeydown(e);
  }

  /** @internal */
  handlePointerdown(e: PointerEvent): void {
    if (this.useActiveDescendant()) {
      e.preventDefault();
    }
  }

  /** @internal */
  handlePointerout(e: PointerEvent): void {
    if (!relatedTo(e, '.x-option')) {
      this.resetActiveOption();
    }
  }

  /** @internal */
  handleOptionClick(option: XOption<T>, e: MouseEvent): void {
    e.preventDefault();
    this.setActiveOption(option);
    this.updateValue(option);
  }

  /** @internal */
  handleOptionPointerenter(option: XOption<T>): void {
    this.setActiveOption(option);
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.#accessor?.handleListboxOptions?.(null);
    });
  }

  private get activeOption(): XOption<T> | null {
    return this.#keyManager.activeItem;
  }

  private setActiveOption(option: XOption<T>): void {
    this.#keyManager.setActiveItem(option);
  }

  private resetActiveOption(): void {
    this.#keyManager.setActiveItem(-1);
  }

  private updateValue(option: XOption<T> | null): void {
    if (!option || option.disabled) {
      return;
    }

    const value = option.value();
    const changed = this.multiple ? this.#model.toggle(value) : this.#model.select(value);

    if (changed) {
      this.#accessor?.handleListboxSelection(this.value);
    }

    if (!this.multiple) {
      this.#popover?.toggle(false);
      this.#popover?.focus();
    }
  }

  private coerceValue(value: T | readonly T[] | null): readonly T[] {
    return value == null ? [] : coerceArray(value);
  }
}
