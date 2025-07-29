import {
  distinctUntilChanged,
  filter,
  Observable,
  ReplaySubject,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import IMask from 'imask/holder';
import type { FactoryArg, InputMask } from 'imask';
import type { FactoryOpts } from 'imask/masked/factory';

import type { XMask } from '@mixin-ui/cdk/providers';
import { isObject } from '@mixin-ui/cdk/utils';

export class IMaskImpl<TModel, TOpt extends Record<string, any>> implements XMask<TModel, TOpt> {
  static readonly Mask = IMask;

  readonly #initialized = new ReplaySubject<void>(1);
  readonly #destroyed = new Subject<void>();

  readonly #adapter: (options: TOpt) => FactoryOpts;

  #mask: InputMask<FactoryArg> | null = null;
  #options: TOpt;
  #externalUpdating = false;
  #optionsUpdating = false;

  constructor(adapter: (options: TOpt) => FactoryOpts, options: TOpt) {
    this.#adapter = adapter;
    this.#options = { ...options };
  }

  get modelValue(): TModel {
    return this.#mask?.typedValue;
  }

  get rawValue(): string {
    return this.#mask?.rawInputValue || '';
  }

  get completed(): boolean {
    return !!this.#mask?.masked?.isComplete;
  }

  readonly valueChanges = this.#initialized.pipe(
    switchMap(() => {
      return new Observable<TModel>(subscriber => {
        const updateFn = () => subscriber.next(this.modelValue);
        this.#mask?.on('accept', updateFn);
        return () => this.#mask?.off('accept', updateFn);
      });
    }),
    distinctUntilChanged(),
    filter(() => this.shouldPropagateChanges),
    takeUntil(this.#destroyed)
  );

  init(el: HTMLElement): void {
    try {
      this.#mask = IMask(el, this.#adapter(this.#options));
    } catch (cause) {
      throw new Error(ngDevMode ? 'Mask initialization failed.' : '', { cause });
    }

    const updateOptions = this.#mask.updateOptions;

    // fix the issue with updating options when the mask type changes
    this.#mask.updateOptions = (options: FactoryOpts) => {
      const maskEquals = this.#mask?.maskEquals(options.mask);

      updateOptions.call(this.#mask, options);

      if (!maskEquals) {
        this.#mask?.masked.updateOptions(options as object);
        this.#mask?.updateControl();
      }
    };

    this.#initialized.next();
  }

  setValue(value: TModel): void {
    this.handleExternalUpdate(() => {
      if (!this.#mask) {
        ngDevMode && console.warn('Trying to set value to an uninitialized mask.');
        return;
      }

      if (isObject(value)) {
        this.#mask.typedValue = value;
      } else {
        this.#mask.unmaskedValue = String(value);
      }
    });
  }

  updateOptions(options: Partial<TOpt>): void {
    this.handleOptionsUpdate(() => {
      this.#options = { ...this.#options, ...options };
      this.#mask?.updateOptions(this.#adapter(this.#options));
    });
  }

  destroy(): void {
    this.#destroyed.next();
    this.#mask?.destroy();
    this.#mask = null;
  }

  private get shouldPropagateChanges(): boolean {
    if (this.#externalUpdating) {
      return false;
    }

    if (this.#optionsUpdating && this.#mask) {
      const { unmaskedValue, rawInputValue, masked } = this.#mask;

      // exclude https://github.com/uNmAnNeR/imaskjs/blob/master/packages/imask/src/controls/input.ts#L225
      // since updating the options with `lazy: false` causes an undesired emission during control initialization
      // due to a mismatch between the model value and the raw input value with a placeholder.
      return unmaskedValue !== masked.unmaskedValue || rawInputValue !== masked.rawInputValue;
    }

    return true;
  }

  private handleExternalUpdate(fn: () => void): void {
    this.#externalUpdating = true;
    try {
      fn();
    } finally {
      this.#externalUpdating = false;
    }
  }

  private handleOptionsUpdate(fn: () => void): void {
    this.#optionsUpdating = true;
    try {
      fn();
    } finally {
      this.#optionsUpdating = false;
    }
  }
}
