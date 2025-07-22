import {
  afterNextRender,
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  inject,
  INJECTOR,
  input,
  OnDestroy,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { relatedTo, watch, XTypedOutletPipe } from '@mixin-ui/cdk';
import { XPopoverTarget } from '@mixin-ui/kit/directives';
import { XOption } from './option';
import { X_LISTBOX_ACCESSOR } from './providers';
import { X_LISTBOX_OPTIONS } from './options';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { EMPTY, merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SelectionModel } from '@angular/cdk/collections';
import { coerceArray } from '@angular/cdk/coercion';

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

const OPTION_SELECTOR = '.x-option';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-listbox',
  styleUrl: './listbox.scss',
  templateUrl: './listbox.html',
  imports: [XTypedOutletPipe, NgComponentOutlet, NgTemplateOutlet],
  host: {
    '[class]': '`x-listbox x-size-${size()} x-radius-${radius()}`',
    '(keydown)': 'handleKeydown($event)',
    '(pointerdown)': 'handlePointerDown($event)',
    '(pointerout)': 'handlePointerOut($event)',
  },
})
export class XListbox<T> implements OnDestroy {
  readonly #opt = inject(X_LISTBOX_OPTIONS);
  readonly #accessor = inject(X_LISTBOX_ACCESSOR, { optional: true });
  readonly #popover = inject(XPopoverTarget, { optional: true });
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;
  readonly #injector = inject(INJECTOR);
  readonly #selectionModel = new ListboxSelectionModel<T>();

  readonly options = contentChildren(XOption<T>);
  readonly size = input(this.#opt.size);
  readonly radius = input(this.#opt.radius);
  readonly wrapNavigation = input(this.#opt.wrapNavigation, { transform: booleanAttribute });
  readonly emptyContent = input(this.#opt.emptyContent);
  readonly useActiveDescendant = input(true);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly empty = computed(() => this.options().length === 0);

  #keyManager!: ActiveDescendantKeyManager<XOption<T>>;

  get value(): readonly T[] {
    return this.#selectionModel.selected;
  }

  set value(value: readonly T[]) {
    this.#selectionModel.setSelection(...this.coerceValue(value));
  }

  multiple = false;

  constructor() {
    effect(() => {
      const value = this.#accessor?.value();
      const multiple = this.#accessor?.multiple() || false;
      const comparator = this.#accessor?.comparator();

      untracked(() => {
        this.value = value;
        this.multiple = multiple;
        this.#selectionModel.compareWith = comparator;
      });
    });

    watch(this.options, () => {
      this.#keyManager.setActiveItem(-1);
    });

    afterRenderEffect(() => {
      const options = this.options();

      untracked(() => {
        this.#accessor?.handleListboxOptions?.(options.map(option => option.value()));
      });
    });

    afterNextRender(() => {
      this.#keyManager = new ActiveDescendantKeyManager(this.options, this.#injector)
        .withWrap(this.wrapNavigation())
        .withAllowedModifierKeys(['shiftKey'])
        .withHomeAndEnd();

      const selected = this.#selectionModel.selected.at(0);

      if (selected) {
        const option = this.options().find(option => option.value() === selected);

        if (option) {
          this.#keyManager.setActiveItem(option);
        }
      } else {
        this.#keyManager.setFirstItemActive();
      }
    });

    merge(this.#accessor?.keyboardEvents || EMPTY)
      .pipe(takeUntilDestroyed())
      .subscribe(e => this.handleKeydown(e));
  }

  isSelected(option: XOption<T>): boolean {
    return this.#selectionModel.isSelected(option.value());
  }

  /** @internal */
  handleKeydown(e: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const activeOption = this.#keyManager.activeItem;
      this.selectOption(activeOption);
    }

    const keyManager = this.#keyManager;
    keyManager.onKeydown(e);
  }

  /** @internal */
  handlePointerDown(e: PointerEvent): void {
    if (this.useActiveDescendant()) {
      e.preventDefault();
    }
  }

  /** @internal */
  handlePointerOut(e: PointerEvent): void {
    if (!relatedTo(e, OPTION_SELECTOR)) {
      this.#keyManager.setActiveItem(-1);
    }
  }

  /** @internal */
  handleOptionClick(option: XOption<T>, e: MouseEvent): void {
    e.preventDefault();
    this.#keyManager.setActiveItem(option);
    this.selectOption(option);
  }

  /** @internal */
  handleOptionPointerEnter(option: XOption<T>): void {
    this.#keyManager.setActiveItem(option);
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.#accessor?.handleListboxOptions?.(null);
    });
  }

  private selectOption(option: XOption<T> | null): void {
    if (!option || option.disabled) {
      return;
    }

    const changed = this.multiple
      ? this.#selectionModel.toggle(option.value())
      : this.#selectionModel.select(option.value());

    if (changed) {
      this.#accessor?.handleListboxValue(this.value);

      if (!this.multiple) {
        this.#popover?.toggle(false);
        this.#popover?.focus();
      }
    }
  }

  private coerceValue(value: readonly T[]): readonly T[] {
    return value == null ? [] : coerceArray(value);
  }
}
