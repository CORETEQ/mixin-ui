import {
  assertInInjectionContext,
  ChangeDetectorRef,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { ControlValueAccessor, NgControl, NgModel, Validators } from '@angular/forms';
import { debounceTime, EMPTY, map, startWith, switchMap, timer } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { watch } from '../signals';
import { EMPTY_FN } from '../empty';

export interface XCva<T> {
  readonly value: Signal<T>;
  readonly disabled: Signal<boolean>;
  readonly required: Signal<boolean>;

  updateValue(updater: T | ((current: T) => T)): void;

  markAsTouched(): void;
}

export interface XCvaOptions<T> {
  readonly defaultValue: T | (() => T);
  readonly transform: (value: T | null) => T;
}

export function createCva<T>(options: XCvaOptions<T>): XCva<T> {
  assertInInjectionContext(createCva);
  return new CvaImpl(options);
}

class CvaImpl<T> implements ControlValueAccessor, XCva<T> {
  readonly #ngc = inject(NgControl, { self: true, optional: true });
  readonly #cdr = inject(ChangeDetectorRef);

  #onChange = EMPTY_FN;
  #onTouched = EMPTY_FN;

  readonly #value: WritableSignal<T>;

  readonly value = computed(() => this.#value() ?? this.defaultValue);

  readonly disabled = signal(false);

  readonly control = toSignal(
    timer(0).pipe(
      switchMap(() => {
        const control = this.#ngc?.control;
        return control
          ? control.events.pipe(
              debounceTime(0),
              startWith(null),
              map(() => control)
            )
          : EMPTY;
      })
    ),
    { initialValue: null }
  );

  readonly required = computed(() => !!this.control()?.hasValidator(Validators.required));

  constructor(readonly options: XCvaOptions<T>) {
    this.#value = signal(this.defaultValue);

    if (this.#ngc) {
      this.#ngc.valueAccessor = this;
    }

    watch(this.value, value => this.#onChange(value));
  }

  updateValue(updater: T | ((current: T) => T)): void {
    const value = this.value();
    const newValue = typeof updater === 'function' ? (updater as (v: T) => T)(value) : updater;
    this.#value.set(newValue);
  }

  markAsTouched(): void {
    this.#onTouched();
    this.#cdr.markForCheck();
  }

  writeValue(value: T | null): void {
    const modelValue = this.#ngc instanceof NgModel ? this.#ngc.model : value;
    this.#value.set(this.options.transform(modelValue));
  }

  registerOnChange(fn: (value: T) => void): void {
    this.#onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.#onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  private get defaultValue(): T {
    const valueOrFactory = this.options.defaultValue;
    return typeof valueOrFactory === 'function' ? (valueOrFactory as () => T)() : valueOrFactory;
  }
}
