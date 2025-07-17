import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef,
  forwardRef,
  inject,
  input,
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
    '(input)': 'handleInput()',
    '(click)': 'togglePopover(!open())',
  },
})
export class XCombobox<T> implements XControlAccessor<T | string | null>, XListboxAccessor<T> {
  readonly #opt = inject(X_COMBOBOX_OPTIONS);
  readonly #popover = inject(XPopoverTarget, { self: true });

  readonly input = contentChild.required(XControl, { read: ElementRef });
  readonly open = this.#popover.open;
  readonly compareFn = input(this.#opt.compareFn);
  readonly stringifyFn = input(this.#opt.stringifyFn);
  readonly strict = input(this.#opt.strict, { transform: booleanAttribute });
  readonly comparator = this.compareFn;
  readonly multiple = signal(false).asReadonly();
  readonly value = signal<T | null>(null);
  readonly valueChanges = new Subject<T | string | null>();

  #options: readonly T[] | null = null;

  constructor() {
    watch(this.open, open => {
      if (!open && this.strict() && !this.hasOption(this.nativeValue)) {
        this.updateModel(null);
        this.updateListbox(null);
        this.updateNative('', true);
      }
    });
  }

  togglePopover(open: boolean): void {
    this.#popover.toggle(open);
  }

  handleInput(): void {
    this.togglePopover(true);

    const option = this.findOption(this.nativeValue);
    this.updateModel(option || this.nativeValue);
    this.updateListbox(option ? option : null);

    if (option) {
      this.updateNative(this.stringify(option));
    }
  }

  handleListboxValue(options: readonly T[]): void {
    const value = options.at(0) || null;
    this.updateModel(value);
    this.updateNative(this.stringify(value));
    this.updateListbox(value);
  }

  handleControlValue(value: T | string | null): void {
    this.updateNative(this.stringify(value));
    this.updateListbox(value as T); // @TODO: resolve
  }

  handleListboxOptions(options: readonly T[] | null): void {
    this.#options = options;

    if (this.#options?.length) {
      const value = this.findOption(this.nativeValue);
      this.updateListbox(value ? value : null);
    }
  }

  private get inputEl(): HTMLInputElement {
    return this.input().nativeElement;
  }

  private get nativeValue(): string {
    return this.inputEl.value;
  }

  private stringify(value: T | string | null): string {
    return this.stringifyFn()(value);
  }

  private hasOption(value: string): boolean {
    return !!this.#options?.some(
      option => this.stringify(option).toLowerCase() === value.toLowerCase()
    );
  }

  private findOption(value: T | string | null): T | null {
    return (
      this.#options?.find(
        option => this.stringify(option).toLowerCase() === this.stringify(value).toLowerCase()
      ) || null
    );
  }

  private updateModel(value: T | string | null): void {
    this.valueChanges.next(value);
  }

  private updateListbox(value: T | null): void {
    this.value.set(value);
  }

  private updateNative(value: string, dispatch = false): void {
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
}
