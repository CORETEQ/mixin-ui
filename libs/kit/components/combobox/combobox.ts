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
  readonly #el = inject(ElementRef).nativeElement;
  readonly #r2 = inject(Renderer2);
  readonly #modelChanges = new Subject<T | string | null>();

  readonly input = contentChild.required(XControl, { read: ElementRef });
  readonly open = this.#popover.open;
  readonly _comparator = input(this.#opt.comparator, { alias: 'comparator' });
  readonly _stringify = input(this.#opt.stringify, { alias: 'stringify' });
  readonly _matcher = input(this.#opt.matcher, { alias: 'matcher' });
  readonly strict = input(this.#opt.strict, { transform: booleanAttribute });
  readonly key = input<PropertyKey>();
  readonly comparator = computed(() =>
    this.key() != null ? createKeyComparator(this.key()!) : this._comparator()
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
      const id = this.#activeDescendant();
      const input = this.input().nativeElement;
      const open = this.open();

      this.#r2.setAttribute(input, 'role', 'combobox');
      this.#r2.setAttribute(input, 'autocomplete', 'false');
      this.#r2.setAttribute(input, 'aria-haspopup', 'listbox');
      this.#r2.setAttribute(input, 'aria-activedescendant', id || '');
      this.#r2.setAttribute(input, 'aria-expanded', String(open));
    });

    watch(this.open, open => {
      if (!open && this.strict() && this.nativeValue !== '' && !this.hasOption(this.nativeValue)) {
        this.updateModel(null);
        this.updateListbox(null);
        this.updateNative('', { inputType: 'deleteContent', data: null });
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
    if (e.target !== this.inputEl) {
      return;
    }

    this.togglePopover(true);

    const option = this.findOption(this.nativeValue);
    this.updateModel(option || this.nativeValue);
    this.updateListbox(option ? option : null);
    if (option) {
      this.updateNative(this.stringify(option));
    }
  }

  /** @internal */
  handleListboxValue(options: readonly T[]): void {
    const value = options.at(0) || null;
    this.updateModel(value);
    this.updateNative(this.stringify(value));
    this.updateListbox(value);
  }

  /** @internal */
  handleControlValue(value: T | string | null): void {
    this.updateNative(this.stringify(value));
    this.updateListbox(value === '' ? null : (value as T));
  }

  /** @internal */
  handleListboxOptions(options: readonly XOption<T>[] | null): void {
    this.#options = options;

    if (this.#options?.length) {
      this.updateListbox(this.findOption(this.nativeValue) || null);
    }
  }

  /** @internal */
  handleListboxActiveDescendant(option: XOption<T> | null): void {
    this.#activeDescendant.set(option?.id() || null);
  }

  private get inputEl(): HTMLInputElement {
    return this.input().nativeElement;
  }

  private get nativeValue(): string {
    return this.inputEl.value;
  }

  private hasOption(value: string): boolean {
    return Boolean(this.#options?.some(option => this.matcher(value, option.value())));
  }

  private findOption(value: string): T | null {
    return this.#options?.find(option => this.matcher(value, option.value()))?.value() || null;
  }

  private updateModel(value: T | string | null): void {
    this.#modelChanges.next(value);
  }

  private updateListbox(value: T | null): void {
    this.selection.set(value);
  }

  private updateNative(value: string, emitEvent?: InputEventInit): void {
    this.inputEl.value = value;

    if (emitEvent) {
      this.inputEl.dispatchEvent(new InputEvent('input', emitEvent));
    }
  }

  private stringify(value: T | string | null): string {
    return this._stringify()(value);
  }

  private matcher(value: string, option: T): boolean {
    return this._matcher()(value, this.stringify(option));
  }
}
