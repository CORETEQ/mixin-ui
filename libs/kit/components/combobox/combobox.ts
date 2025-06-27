import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { createCva, relatedTo, watch } from '@mixin-ui/cdk';
import { XInput, XPopover } from '@mixin-ui/kit/directives';
import { X_LISTBOX_ACCESSOR, XListboxAccessor } from '@mixin-ui/kit/components/listbox';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-combobox',
  styleUrl: './combobox.scss',
  templateUrl: './combobox.html',
  imports: [],
  providers: [
    {
      provide: X_LISTBOX_ACCESSOR,
      useExisting: forwardRef(() => XComboboxRoot),
    },
  ],
  hostDirectives: [
    {
      directive: XInput,
      inputs: ['variant', 'size', 'radius', 'color'],
    },
  ],
  host: {
    role: 'combobox',
    class: 'x-combobox',
    '(blur)': 'onBlur($event)',
    '(keydown.arrowDown)': '$event.preventDefault(); togglePopover(true)',
    '(click)': 'togglePopover(!open())',
  },
})
export class XComboboxRoot<T> implements XListboxAccessor<T> {
  readonly #popover = inject(XPopover, { self: true });

  readonly multiple = input(false);
  readonly open = this.#popover.open;

  readonly #cva = createCva<T | readonly T[] | null>({
    defaultValue: () => (this.multiple() ? [] : null),
    transform: value => value,
  });

  readonly value = this.#cva.value;
  readonly disabled = this.#cva.disabled;

  readonly hasValue = computed(() => {
    const value = this.value();
    return Array.isArray(value) ? value.length > 0 : !!value;
  });

  readonly valueAsString = computed(() => {
    const value = this.value();
    return Array.isArray(value) ? value.join(', ') : value ?? '';
  });

  constructor() {
    watch(this.open, open => {
      if (!open) {
        this.#cva.markAsTouched();
      }
    });
  }

  select(values: readonly T[]): void {
    this.#cva.updateValue(this.multiple() ? values : values.at(0) ?? null);
  }

  togglePopover(open: boolean): void {
    this.#popover.toggle(open);
  }

  protected onBlur(e: FocusEvent): void {
    if (relatedTo(e, this.#popover.overlayElement)) {
      return;
    }
    this.#cva.markAsTouched();
  }
}
