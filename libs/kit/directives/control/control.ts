import {
  Directive,
  ElementRef,
  forwardRef,
  inject,
  InjectionToken,
  INJECTOR,
  input,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, NgModel } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { EMPTY_FN, X_MASK } from '@mixin-ui/cdk';

export const X_CONTROL_ID = new InjectionToken<string>('CONTROL_ID');

@Directive({
  selector: 'input:not([type=checkbox])[x-control]',
  exportAs: 'x-control',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => XControl),
      multi: true,
    },
  ],
  host: {
    '[type]': '`text`',
    '[attr.id]': 'id()',
    '(blur)': 'onTouched();',
  },
})
export class XControl<T> implements ControlValueAccessor {
  readonly #mask = inject(X_MASK, { optional: true });
  readonly #injector = inject(INJECTOR);
  readonly #el = inject(ElementRef).nativeElement;
  readonly #r2 = inject(Renderer2);

  protected onChange = EMPTY_FN;
  protected onTouched = EMPTY_FN;

  readonly id = input(inject(X_CONTROL_ID, { optional: true }));

  constructor() {
    this.#mask?.init(this.#el);

    (this.#mask ? this.#mask.valueChanges : fromEvent(this.#el, 'input'))
      .pipe(takeUntilDestroyed())
      .subscribe(value => this.onChange(value));
  }

  writeValue(value: T | null): void {
    const modelValue = this.control instanceof NgModel ? this.control.model : value;

    if (this.#mask) {
      this.#mask.setValue(modelValue);
    } else {
      const normalizedValue = modelValue == null ? '' : modelValue;
      this.#r2.setProperty(this.#el, 'value', normalizedValue);
    }
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.#r2.setProperty(this.#el, 'disabled', isDisabled);
  }

  private get control(): NgControl | null {
    return this.#injector.get(NgControl, null, { self: true, optional: true });
  }
}
