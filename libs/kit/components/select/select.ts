import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  forwardRef,
  inject,
  input,
  numberAttribute,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { createCva, relatedTo, watch } from '@mixin-ui/cdk';
import { createKeyComparator } from '@mixin-ui/kit/providers';
import { X_SLOT, XInputBase, XPopoverTarget, XSlotsPipe } from '@mixin-ui/kit/directives';
import { XIcon } from '@mixin-ui/kit/components/icon';
import { provideListboxAccessor, XListboxAccessor } from '@mixin-ui/kit/components/listbox';
import { X_SELECT_OPTIONS } from './options';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-select',
  styleUrl: './select.scss',
  templateUrl: './select.html',
  imports: [XIcon, XSlotsPipe, NgTemplateOutlet],
  providers: [provideListboxAccessor(forwardRef(() => XSelect))],
  hostDirectives: [
    {
      directive: XInputBase,
      inputs: ['variant', 'size', 'radius'],
    },
    {
      directive: XPopoverTarget,
      inputs: [
        'x-popover-fixed: popoverFixed',
        'x-popover-stretch: popoverStretch',
        'x-popover-min-width: popoverMinWidth',
        'x-popover-max-width: popoverMaxWidth',
      ],
    },
  ],
  host: {
    role: 'combobox',
    class: 'x-select',
    '[attr.tabindex]': 'tabIndex()',
    '[attr.aria-expanded]': 'open()',
    '(keydown.arrowDown)': 'handleArrowDown($event)',
    '(click)': 'togglePopover(!open())',
    '(blur)': 'handleBlur($event)',
  },
})
export class XSelect<T> implements XListboxAccessor<T> {
  readonly #opt = inject(X_SELECT_OPTIONS);
  readonly #popover = inject(XPopoverTarget, { self: true });

  readonly open = this.#popover.open;
  readonly slots = contentChildren(X_SLOT);
  readonly placeholder = input<string>();
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly _comparator = input(this.#opt.comparator, { alias: 'comparator' });
  readonly key = input<PropertyKey>();
  readonly enabledTabIndex = input(0, { transform: numberAttribute });
  readonly tabIndex = computed(() => (this.disabled() ? null : String(this.enabledTabIndex())));
  readonly comparator = computed(() =>
    this.key() != null ? createKeyComparator(this.key()!) : this._comparator()
  );

  readonly #cva = createCva<T | readonly T[] | null>({
    defaultValue: () => (this.multiple() ? [] : null),
    transform: value => value,
  });

  readonly selection = this.#cva.value;
  readonly disabled = this.#cva.disabled;

  readonly hasValue = computed(() => {
    const value = this.selection();
    return Array.isArray(value) ? value.length > 0 : !!value;
  });

  readonly valueAsString = computed(() => {
    const value = this.selection();
    return Array.isArray(value) ? value.join(', ') : value ?? '';
  });

  readonly placeholderShown = computed(() => !!this.placeholder() && !this.hasValue());

  constructor() {
    effect(() => {
      this.#popover.setDisabled(this.disabled());
    });

    watch(this.open, open => {
      if (!open) {
        this.#cva.markAsTouched();
      }
    });
  }

  togglePopover(open: boolean): void {
    this.#popover.toggle(open);
  }

  /** @internal */
  handleArrowDown(e: KeyboardEvent): void {
    if (e.defaultPrevented) {
      return;
    }

    e.preventDefault();
    this.togglePopover(true);
  }

  /** @internal */
  handleBlur(e: FocusEvent): void {
    if (!relatedTo(e, this.#popover.overlayElement)) {
      this.#cva.markAsTouched();
    }
  }

  /** @internal */
  handleListboxSelection(values: readonly T[]): void {
    this.#cva.updateValue(this.multiple() ? values : values.at(0) ?? null);
  }
}
