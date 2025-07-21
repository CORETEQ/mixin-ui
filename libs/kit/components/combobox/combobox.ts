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
import { Subject } from 'rxjs';
import { watch } from '@mixin-ui/cdk';
import {
  provideControlAccessor,
  providePopoverOptions,
  XControl,
  XControlAccessor,
  XInput,
  XPopoverTarget,
} from '@mixin-ui/kit/directives';
import { provideListboxAccessor, XListboxAccessor } from '@mixin-ui/kit/components/listbox';
import { X_COMBOBOX_OPTIONS } from './options';
import { createKeyComparator } from '@mixin-ui/kit/providers';

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
  },
})
export class XCombobox<T> implements XControlAccessor<T | string | null>, XListboxAccessor<T> {
  readonly #opt = inject(X_COMBOBOX_OPTIONS);
  readonly #popover = inject(XPopoverTarget);
  readonly #r2 = inject(Renderer2);

  readonly input = contentChild.required(XControl, { read: ElementRef });
  readonly open = this.#popover.open;
  readonly compare = input(this.#opt.comparator, { alias: 'comparator' });
  readonly asString = input(this.#opt.stringify, { alias: 'stringify' });
  readonly match = input(this.#opt.matcher, { alias: 'matcher' });
  readonly strict = input(this.#opt.strict, { transform: booleanAttribute });
  readonly key = input<string>();
  readonly comparator = computed(() =>
    this.key() ? createKeyComparator(this.key()!) : this.compare()
  );
  readonly multiple = signal(false).asReadonly();
  readonly value = signal<T | null>(null);

  readonly controlChanges = new Subject<T | string | null>();

  #options: readonly T[] | null = null;

  constructor() {
    effect(() => {
      const input = this.input().nativeElement;
      const open = this.open();

      this.#r2.setAttribute(input, 'role', 'combobox');
      this.#r2.setAttribute(input, 'aria-haspopup', 'listbox');
      this.#r2.setAttribute(input, 'aria-expanded', String(open));
    });

    watch(this.open, open => {
      if (!open && this.strict() && this.nativeValue !== '' && !this.hasOption(this.nativeValue)) {
        this.updateModelValue(null);
        this.updateListboxValue(null);
        this.updateNativeValue('', true);
      }
    });
  }

  togglePopover(open: boolean): void {
    this.#popover.toggle(open);
  }

  handleInput(e: InputEvent): void {
    if (e.target !== this.inputEl) {
      return;
    }

    this.togglePopover(true);

    const option = this.findOption(this.nativeValue);

    this.updateModelValue(option || this.nativeValue);
    this.updateListboxValue(option ? option : null);

    if (option) {
      this.updateNativeValue(this.stringify(option));
    }
  }

  handleListboxValue(options: readonly T[]): void {
    const value = options.at(0) || null;
    this.updateModelValue(value);
    this.updateNativeValue(this.stringify(value));
    this.updateListboxValue(value);
  }

  handleControlValue(value: T | string | null): void {
    this.updateNativeValue(this.stringify(value));
    this.updateListboxValue(value === '' ? null : (value as T));
  }

  handleListboxOptions(options: readonly T[] | null): void {
    this.#options = options;

    if (this.#options?.length) {
      const value = this.findOption(this.nativeValue);
      this.updateListboxValue(value ? value : null);
    }
  }

  private get inputEl(): HTMLInputElement {
    return this.input().nativeElement;
  }

  private get nativeValue(): string {
    return this.inputEl.value;
  }

  private hasOption(value: string): boolean {
    return Boolean(this.#options?.some(option => this.matcher(value, option)));
  }

  private findOption(value: string): T | null {
    return this.#options?.find(option => this.matcher(value, option)) || null;
  }

  private updateModelValue(value: T | string | null): void {
    this.controlChanges.next(value);
  }

  private updateListboxValue(value: T | null): void {
    this.value.set(value);
  }

  private updateNativeValue(value: string, dispatch = false): void {
    this.inputEl.value = value;

    if (dispatch) {
      this.inputEl.dispatchEvent(
        new InputEvent('input', {
          inputType: 'insertText',
          data: '',
        })
      );
    }
  }

  private stringify(value: T | string | null): string {
    return this.asString()(value);
  }

  private matcher(value: string, option: T): boolean {
    return this.match()(value, this.stringify(option));
  }
}
