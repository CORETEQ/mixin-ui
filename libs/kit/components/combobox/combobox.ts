import {
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
  imports: [],
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
    '(input)': 'togglePopover(true)',
    '(click)': 'togglePopover(!open())',
  },
})
export class XCombobox<T> implements XControlAccessor<T | null>, XListboxAccessor<T> {
  readonly #opt = inject(X_COMBOBOX_OPTIONS);
  readonly #popover = inject(XPopoverTarget, { self: true });

  readonly input = contentChild.required(XControl, { read: ElementRef });
  readonly open = this.#popover.open;
  readonly comparator = input(this.#opt.compareFn);
  readonly multiple = signal(false).asReadonly();
  readonly value = signal<T | null>(null);
  readonly valueChanges = new Subject<T | null>();

  readonly stringify = (value: T | null) => (value ? String(value) : '');

  togglePopover(open: boolean): void {
    this.#popover.toggle(open);
  }

  handleOptions(values: readonly T[]): void {
    const value = values.at(0) ?? null;

    this.updateModelValue(value);
    this.updateNativeValue(this.stringify(value));
  }

  handleControlValue(value: T | null): void {
    this.updateListBoxValue(value);
    this.updateNativeValue(this.stringify(value));
  }

  private get inputEl(): HTMLInputElement {
    return this.input().nativeElement;
  }

  private updateModelValue(value: T | null): void {
    this.valueChanges.next(value);
  }

  private updateListBoxValue(value: T | null): void {
    // @TODO
    // warn! if value doesnt match any option from options list it will be thrown
    // solve?
  }

  private updateNativeValue(value: string): void {
    this.inputEl.value = value;
  }
}
