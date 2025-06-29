import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  effect,
  forwardRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import {
  injectMask,
  isElement,
  provideMask,
  X_DATE_MASK_FACTORY,
  XDateMaskOptions,
} from '@mixin-ui/cdk';
import {
  provideControlAccessor,
  XControlAccessor,
  XInput,
  XPopover,
  XPopoverContent,
} from '@mixin-ui/kit/directives';
import { provideCalendarAccessor, XCalendarAccessor } from '@mixin-ui/kit/components/calendar';
import { XButton } from '@mixin-ui/kit/components/button';
import { XIcon } from '@mixin-ui/kit/components/icon';
import { X_INPUT_DATE_OPTIONS } from './options';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-date',
  templateUrl: './date.html',
  imports: [XButton, XIcon],
  providers: [
    provideMask(X_DATE_MASK_FACTORY),
    provideControlAccessor(forwardRef(() => XDateRoot)),
    provideCalendarAccessor(forwardRef(() => XDateRoot)),
  ],
  hostDirectives: [
    {
      directive: XInput,
      inputs: ['variant', 'size', 'radius', 'color'],
    },
    {
      directive: XPopover,
      inputs: [
        'x-popover-open: open',
        'x-popover-stretch: popoverStretch',
        'x-popover-min-width: popoverMinWidth',
        'x-popover-max-width: popoverMaxWidth',
      ],
      outputs: ['x-popover-openChange: openChange'],
    },
  ],
  host: {
    class: 'x-date',
    '(focusin)': 'onFocusIn($event)',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class XDateRoot implements XControlAccessor<Date | null>, XCalendarAccessor {
  readonly #opt = inject(X_INPUT_DATE_OPTIONS);
  readonly #mask = injectMask<Date | null, XDateMaskOptions>();
  readonly #input = inject(XInput, { self: true });
  readonly #popover = inject(XPopover, { self: true });
  readonly #calendarChanges$ = new Subject<Date | null>();

  readonly size = this.#input.size;
  readonly open = this.#popover.open;
  readonly popoverContent = contentChild(XPopoverContent);
  readonly value = signal<Date | null>(null);

  /** Enable multiple date selection mode */
  readonly multiple = input(this.#opt.multiple, { transform: booleanAttribute });

  /** Show calendar popover when input field receives focus (defaults to true) */
  readonly popoverOnFocus = input(this.#opt.popoverOnFocus, { transform: booleanAttribute });

  /** Minimum allowed date value */
  readonly min = input(this.#opt.min);

  /** Maximum allowed date value */
  readonly max = input(this.#opt.max);

  /**
   * Date format pattern using characters: d, M, y,
   * For example, 'dd/MM/yyyy' for dates like '25/12/2024'
   */
  readonly pattern = input(this.#opt.pattern);

  /**
   * Automatically fix invalid date parts when possible,
   * For example, converting '33' to '31' for days
   */
  readonly autofix = input(this.#opt.autofix, { transform: booleanAttribute });

  /** Show filler characters for empty positions */
  readonly showFiller = input(this.#opt.showFiller, { transform: booleanAttribute });

  /** Character to use as a filler for empty positions */
  readonly fillerChar = input(this.#opt.fillerChar);

  readonly valueChanges = merge(this.#mask.valueChanges, this.#calendarChanges$);

  constructor() {
    effect(() =>
      this.#mask.updateOptions({
        min: this.min(),
        max: this.max(),
        autofix: this.autofix(),
        pattern: this.pattern(),
        showFiller: this.showFiller(),
        fillerChar: this.fillerChar(),
      })
    );
  }

  togglePopover(open: boolean): void {
    this.#popover.toggle(open);
  }

  select(value: Date | null): void {
    this.value.set(value);
    this.#calendarChanges$.next(value);
  }

  setValue(value: Date | null): void {
    this.value.set(value);
    this.#mask.setValue(value);
  }

  onControlInit(el: HTMLInputElement): void {
    this.#mask.init(el);
  }

  onControlDestroy(): void {
    this.#mask.destroy();
  }

  protected onFocusIn(e: FocusEvent): void {
    if (isElement(e.target) && e.target.matches('input') && this.popoverOnFocus()) {
      this.#popover.toggle(true);
    }
  }

  protected onFocusOut(e: FocusEvent): void {
    if (isElement(e.target) && e.target.matches('input') && !this.#mask.completed) {
      this.#mask.setValue(null);
    }
  }
}
