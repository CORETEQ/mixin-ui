import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  Renderer2,
  signal,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { watch } from '@mixin-ui/cdk';
import {
  provideControlAccessor,
  providePopoverOptions,
  XControl,
  XControlAccessor,
  XInput,
  XPopoverTarget,
} from '@mixin-ui/kit/directives';
import { createKeyComparator } from '@mixin-ui/kit/providers';
import {
  provideListboxAccessor,
  provideListboxOptions,
  XListboxAccessor,
  XOption,
} from '@mixin-ui/kit/components/listbox';
import { X_COMBOBOX_OPTIONS } from './options';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-combobox',
  styleUrl: './combobox.scss',
  templateUrl: './combobox.html',
  providers: [
    provideControlAccessor(forwardRef(() => XCombobox)),
    provideListboxAccessor(forwardRef(() => XCombobox)),
    provideListboxOptions({ useActiveDescendant: true }),
    providePopoverOptions({ autoFocus: false }),
  ],
  hostDirectives: [
    {
      directive: XInput,
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
    class: 'x-combobox',
    '(input)': 'handleInput($event)',
    '(click)': 'togglePopover(!open())',
    '(keydown.arrowDown)': 'handleArrowDown($event)',
  },
})
export class XCombobox<T> implements XControlAccessor<T | string | null>, XListboxAccessor<T> {
  readonly #opt = inject(X_COMBOBOX_OPTIONS);
  readonly #popover = inject(XPopoverTarget);
  readonly #input = inject(XInput);
  readonly #el = inject(ElementRef).nativeElement;
  readonly #r2 = inject(Renderer2);
  readonly #modelChanges = new Subject<T | string | null>();

  readonly open = this.#popover.open;
  readonly input = contentChild.required(XControl, { read: ElementRef });
  readonly stringify = input(this.#opt.stringify);
  readonly matcher = input(this.#opt.matcher);
  readonly _comparator = input(this.#opt.comparator, { alias: 'comparator' });
  readonly strict = input(this.#opt.strict, { transform: booleanAttribute });
  readonly key = input<PropertyKey>();
  readonly comparator = computed(() =>
    this.key() != null ? createKeyComparator(this.key()!) : this._comparator()
  );
  readonly disabled = computed(
    () => this.#input.state()?.disabled || this.#input.state()?.readOnly
  );

  /** @internal */
  readonly selection = signal<T | null>(null);

  /** @internal */
  readonly keyboardEvents = fromEvent<KeyboardEvent>(this.#el, 'keydown');

  /** @internal */
  readonly valueChanges = this.#modelChanges.asObservable();

  readonly #activeDescendant = signal<string | null>(null);

  #options: readonly XOption<T>[] | null = null;

  constructor() {
    effect(() => {
      const input = this.nativeElement;
      const activeId = this.#activeDescendant();
      const open = this.open();

      this.#r2.setAttribute(input, 'role', 'combobox');
      this.#r2.setAttribute(input, 'autocomplete', 'false');
      this.#r2.setAttribute(input, 'aria-haspopup', 'listbox');
      this.#r2.setAttribute(input, 'aria-activedescendant', activeId || '');
      this.#r2.setAttribute(input, 'aria-expanded', String(open));
    });

    effect(() => {
      this.#popover.setDisabled(this.disabled());
    });

    watch(this.open, open => {
      if (!open && this.strict() && this.nativeValue !== '' && !this.hasOption(this.nativeValue)) {
        this.updateModelValue(null);
        this.updateSelection(null);
        this.resetNativeValue();
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
  handleInput(e: InputEvent): void {
    if (e.target !== this.nativeElement) {
      return;
    }

    this.togglePopover(true);

    const option = this.findOption(this.nativeValue);

    if (option) {
      const value = option.value();

      this.updateModelValue(value);
      this.updateSelection(value);
      this.updateNativeValue(value);
    } else {
      this.updateModelValue(this.nativeValue);
      this.updateSelection(null);
    }
  }

  /** @internal */
  handleControlValue(value: T | string | null): void {
    this.updateNativeValue(value);
    this.updateSelection(value === '' ? null : (value as T));
  }

  /** @internal */
  handleListboxSelection(values: readonly T[]): void {
    const value = values.at(0) || null;

    this.updateModelValue(value);
    this.updateNativeValue(value);
    this.updateSelection(value);
  }

  /** @internal */
  handleListboxOptions(options: readonly XOption<T>[] | null): void {
    this.#options = options;

    if (this.#options?.length) {
      const option = this.findOption(this.nativeValue);
      this.updateSelection(option ? option.value() : null);
    }
  }

  /** @internal */
  handleListboxActiveDescendant(option: XOption<T> | null): void {
    this.#activeDescendant.set(option?.id() || null);
  }

  private get nativeElement(): HTMLInputElement {
    return untracked(this.input).nativeElement;
  }

  private get nativeValue(): string {
    return this.nativeElement.value;
  }

  private hasOption(value: string): boolean {
    return !!this.#options?.some(option => !option.disabled && this.matches(value, option));
  }

  private findOption(value: string): XOption<T> | null {
    return this.#options?.find(option => !option.disabled && this.matches(value, option)) || null;
  }

  private updateSelection(value: T | null): void {
    this.selection.set(value);
  }

  private updateModelValue(value: T | string | null): void {
    this.#modelChanges.next(value);
  }

  private updateNativeValue(value: T | string | null): void {
    const stringify = this.stringify();
    this.nativeElement.value = stringify(value);
  }

  private resetNativeValue(): void {
    this.nativeElement.value = '';

    this.nativeElement.dispatchEvent(
      new InputEvent('input', {
        inputType: 'deleteContent',
        data: null,
      })
    );
  }

  private matches(value: string, option: XOption<T>): boolean {
    const matcher = this.matcher();
    const stringify = this.stringify();
    const optionValue = stringify(option.value());

    return matcher(value, optionValue);
  }
}
