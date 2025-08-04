import { Directive, ElementRef, forwardRef, inject, INJECTOR, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, NgModel } from '@angular/forms';
import { fromEvent, map, Observable } from 'rxjs';
import { EMPTY_FN, observe } from '@mixin-ui/cdk';
import { X_CONTROL_ACCESSOR } from './providers';

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
    type: 'text',
    '(blur)': 'markAsTouched();',
  },
})
export class XControl<T> implements ControlValueAccessor {
  readonly #accessor = inject(X_CONTROL_ACCESSOR, { optional: true });
  readonly #injector = inject(INJECTOR);
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;
  readonly #r2 = inject(Renderer2);

  protected setModelValue = EMPTY_FN;
  protected markAsTouched = EMPTY_FN;

  constructor() {
    observe(this.valueChanges, value => {
      if (this.modelValue === value) {
        return;
      }

      this.setModelValue(value);
    });
  }

  writeValue(value: T | null): void {
    const modelValue = this.control instanceof NgModel ? this.control.model : value;

    if (this.#accessor) {
      this.#accessor.handleControlValue(modelValue);
    } else {
      this.#r2.setProperty(this.#el, 'value', modelValue == null ? '' : modelValue);
    }
  }

  registerOnChange(fn: (value: T) => void): void {
    this.setModelValue = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.markAsTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.#r2.setProperty(this.#el, 'disabled', disabled);
  }

  private get valueChanges(): Observable<T> {
    if (this.#accessor) {
      return this.#accessor.valueChanges;
    } else {
      return fromEvent(this.#el, 'input').pipe(map(() => this.#el.value));
    }
  }

  private get modelValue(): T | null {
    return this.control?.control?.value || null;
  }

  private get control(): NgControl | null {
    return this.#injector.get(NgControl, null, { self: true, optional: true });
  }
}
