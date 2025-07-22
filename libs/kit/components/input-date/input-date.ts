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
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge, Subject } from 'rxjs';
import {
  injectMask,
  isMatchingTarget,
  provideMask,
  watch,
  X_DATE_MASK_FACTORY,
  XDateMaskOptions,
} from '@mixin-ui/cdk';
import {
  provideControlAccessor,
  providePopoverOptions,
  XControl,
  XControlAccessor,
  XInput,
  XPopoverTarget,
} from '@mixin-ui/kit/directives';
import { provideCalendarAccessor, XCalendarAccessor } from '@mixin-ui/kit/components/calendar';
import { provideButtonOptions, XButton } from '@mixin-ui/kit/components/button';
import { XIcon } from '@mixin-ui/kit/components/icon';
import { X_INPUT_DATE_OPTIONS } from './options';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-input-date',
  templateUrl: './input-date.html',
  imports: [XIcon, XButton],
  providers: [
    provideMask(X_DATE_MASK_FACTORY),
    provideControlAccessor(forwardRef(() => XInputDate)),
    provideCalendarAccessor(forwardRef(() => XInputDate)),
    providePopoverOptions({ autoFocus: false, stretch: 'auto' }),
    provideButtonOptions({ variant: 'outline', color: 'neutral', radius: 'none' }),
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
    class: 'x-input-date',
    '(focusin)': 'handleFocusIn($event)',
    '(focusout)': 'handleFocusOut($event)',
  },
})
export class XInputDate implements XControlAccessor<Date | null>, XCalendarAccessor {
  readonly #opt = inject(X_INPUT_DATE_OPTIONS);
  readonly #mask = injectMask<Date | null, XDateMaskOptions>();
  readonly #input = inject(XInput);
  readonly #popover = inject(XPopoverTarget);
  readonly #calendarChanges = new Subject<Date>();
  readonly #valueReset = new Subject<null>();

  readonly input = contentChild.required(XControl, { read: ElementRef });
  readonly control = contentChild(XControl, { read: NgControl });
  readonly size = this.#input.size;
  readonly open = this.#popover.open;

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

  readonly disabled = computed(() => this.#input.state()?.disabled);

  /** @internal */
  readonly calendar = signal<Date | null>(null);

  /** @internal */
  readonly valueChanges = merge(this.#mask.valueChanges, this.#calendarChanges, this.#valueReset);

  constructor() {
    effect(() => {
      this.#mask.init(this.input().nativeElement);
    });

    effect(() => {
      this.#mask.updateOptions({
        min: this.min(),
        max: this.max(),
        autofix: this.autofix(),
        pattern: this.pattern(),
        showFiller: this.showFiller(),
        fillerChar: this.fillerChar(),
      });
    });

    watch(this.open, open => {
      if (!open) {
        this.control()?.control?.markAsTouched();
      }
    });

    this.#mask.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      this.calendar.set(value);
    });

    this.#calendarChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      this.calendar.set(value);
      this.#mask.setValue(value);
    });

    this.#valueReset.pipe(takeUntilDestroyed()).subscribe(value => {
      this.calendar.set(value);
      this.#mask.setValue(value);
    });
  }

  togglePopover(open: boolean): void {
    this.#popover.toggle(open);
  }

  /** @internal */
  handleFocusIn(e: FocusEvent): void {
    if (isMatchingTarget(e, 'input') && this.popoverOnFocus()) {
      this.#popover.toggle(true);
    }
  }

  /** @internal */
  handleFocusOut(e: FocusEvent): void {
    if (isMatchingTarget(e, 'input') && !this.#mask.completed) {
      this.#valueReset.next(null);
    }
  }

  /** @internal */
  handleCalendarValue(value: Date): void {
    this.#calendarChanges.next(value);
  }

  /** @internal */
  handleControlValue(value: Date | null): void {
    this.calendar.set(value);
    this.#mask.setValue(value);
  }
}
