import {
  Directive,
  ElementRef,
  forwardRef,
  inject,
  INJECTOR,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, NgModel } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, map, Observable } from 'rxjs';
import { EMPTY_FN } from '@mixin-ui/cdk';
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
    '(blur)': 'onTouched();',
  },
})
export class XControl<T> implements ControlValueAccessor, OnDestroy {
  readonly #accessor = inject(X_CONTROL_ACCESSOR, { optional: true });
  readonly #injector = inject(INJECTOR);
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;
  readonly #r2 = inject(Renderer2);

  protected onChange = EMPTY_FN;
  protected onTouched = EMPTY_FN;

  constructor() {
    if (this.#accessor?.onControlInit) {
      this.#accessor.onControlInit(this.#el);
    }
    this.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => this.onChange(value));
  }

  writeValue(value: T | null): void {
    const modelValue = this.control instanceof NgModel ? this.control.model : value;

    if (this.#accessor) {
      this.#accessor.setValue(modelValue);
    } else {
      this.#r2.setProperty(this.#el, 'value', modelValue == null ? '' : modelValue);
    }
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.#r2.setProperty(this.#el, 'disabled', disabled);
  }

  ngOnDestroy(): void {
    if (this.#accessor?.onControlDestroy) {
      this.#accessor.onControlDestroy();
    }
  }

  private get valueChanges(): Observable<T> {
    if (this.#accessor) {
      return this.#accessor.valueChanges;
    } else {
      return fromEvent(this.#el, 'input').pipe(map(() => this.#el.value));
    }
  }

  private get control(): NgControl | null {
    return this.#injector.get(NgControl, null, { self: true, optional: true });
  }
}
